'use strict';

var Extensions = require('../../../extensions/Extensions.js');
var compileHighShaderToProgram = require('../../high-shader/compileHighShaderToProgram.js');
var colorBit = require('../../high-shader/shader-bits/colorBit.js');
var generateTextureBatchBit = require('../../high-shader/shader-bits/generateTextureBatchBit.js');
var roundPixelsBit = require('../../high-shader/shader-bits/roundPixelsBit.js');
var Shader = require('../../renderers/shared/shader/Shader.js');
var State = require('../../renderers/shared/state/State.js');
var _const = require('../shared/const.js');
var getTextureBatchBindGroup = require('./getTextureBatchBindGroup.js');

"use strict";
const tempState = State.State.for2d();
class GpuBatchAdaptor {
  init() {
    const gpuProgram = compileHighShaderToProgram.compileHighShaderGpuProgram({
      name: "batch",
      bits: [
        colorBit.colorBit,
        generateTextureBatchBit.generateTextureBatchBit(_const.MAX_TEXTURES),
        roundPixelsBit.roundPixelsBit
      ]
    });
    this._shader = new Shader.Shader({
      gpuProgram,
      groups: {
        // these will be dynamically allocated
      }
    });
  }
  start(batchPipe, geometry) {
    const renderer = batchPipe.renderer;
    const encoder = renderer.encoder;
    const program = this._shader.gpuProgram;
    this._geometry = geometry;
    encoder.setGeometry(geometry);
    tempState.blendMode = "normal";
    renderer.pipeline.getPipeline(
      geometry,
      program,
      tempState
    );
    const globalUniformsBindGroup = renderer.globalUniforms.bindGroup;
    encoder.resetBindGroup(1);
    encoder.setBindGroup(0, globalUniformsBindGroup, program);
  }
  execute(batchPipe, batch) {
    const program = this._shader.gpuProgram;
    const renderer = batchPipe.renderer;
    const encoder = renderer.encoder;
    if (!batch.bindGroup) {
      const textureBatch = batch.textures;
      batch.bindGroup = getTextureBatchBindGroup.getTextureBatchBindGroup(textureBatch.textures, textureBatch.count);
    }
    tempState.blendMode = batch.blendMode;
    const gpuBindGroup = renderer.bindGroup.getBindGroup(
      batch.bindGroup,
      program,
      1
    );
    const pipeline = renderer.pipeline.getPipeline(
      this._geometry,
      program,
      tempState
    );
    batch.bindGroup._touch(renderer.textureGC.count);
    encoder.setPipeline(pipeline);
    encoder.renderPassEncoder.setBindGroup(1, gpuBindGroup);
    encoder.renderPassEncoder.drawIndexed(batch.size, 1, batch.start);
  }
  destroy() {
    this._shader.destroy(true);
    this._shader = null;
  }
}
/** @ignore */
GpuBatchAdaptor.extension = {
  type: [
    Extensions.ExtensionType.WebGPUPipesAdaptor
  ],
  name: "batch"
};

exports.GpuBatchAdaptor = GpuBatchAdaptor;
//# sourceMappingURL=GpuBatchAdaptor.js.map
