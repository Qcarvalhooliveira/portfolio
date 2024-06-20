'use strict';

var Extensions = require('../../../extensions/Extensions.js');
var compileHighShaderToProgram = require('../../high-shader/compileHighShaderToProgram.js');
var colorBit = require('../../high-shader/shader-bits/colorBit.js');
var generateTextureBatchBit = require('../../high-shader/shader-bits/generateTextureBatchBit.js');
var roundPixelsBit = require('../../high-shader/shader-bits/roundPixelsBit.js');
var batchSamplersUniformGroup = require('../../renderers/gl/shader/batchSamplersUniformGroup.js');
var Shader = require('../../renderers/shared/shader/Shader.js');
var State = require('../../renderers/shared/state/State.js');
var _const = require('../shared/const.js');

"use strict";
class GlBatchAdaptor {
  constructor() {
    this._didUpload = false;
    this._tempState = State.State.for2d();
  }
  init(batcherPipe) {
    const glProgram = compileHighShaderToProgram.compileHighShaderGlProgram({
      name: "batch",
      bits: [
        colorBit.colorBitGl,
        generateTextureBatchBit.generateTextureBatchBitGl(_const.MAX_TEXTURES),
        roundPixelsBit.roundPixelsBitGl
      ]
    });
    this._shader = new Shader.Shader({
      glProgram,
      resources: {
        batchSamplers: batchSamplersUniformGroup.batchSamplersUniformGroup
      }
    });
    batcherPipe.renderer.runners.contextChange.add(this);
  }
  contextChange() {
    this._didUpload = false;
  }
  start(batchPipe, geometry) {
    const renderer = batchPipe.renderer;
    renderer.shader.bind(this._shader, this._didUpload);
    renderer.shader.updateUniformGroup(renderer.globalUniforms.uniformGroup);
    renderer.geometry.bind(geometry, this._shader.glProgram);
  }
  execute(batchPipe, batch) {
    const renderer = batchPipe.renderer;
    this._didUpload = true;
    this._tempState.blendMode = batch.blendMode;
    renderer.state.set(this._tempState);
    const textures = batch.textures.textures;
    for (let i = 0; i < textures.length; i++) {
      renderer.texture.bind(textures[i], i);
    }
    renderer.geometry.draw("triangle-list", batch.size, batch.start);
  }
  destroy() {
    this._shader.destroy(true);
    this._shader = null;
  }
}
/** @ignore */
GlBatchAdaptor.extension = {
  type: [
    Extensions.ExtensionType.WebGLPipesAdaptor
  ],
  name: "batch"
};

exports.GlBatchAdaptor = GlBatchAdaptor;
//# sourceMappingURL=GlBatchAdaptor.js.map
