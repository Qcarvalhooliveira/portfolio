import { ExtensionType } from '../../../extensions/Extensions.mjs';
import { compileHighShaderGlProgram } from '../../high-shader/compileHighShaderToProgram.mjs';
import { colorBitGl } from '../../high-shader/shader-bits/colorBit.mjs';
import { generateTextureBatchBitGl } from '../../high-shader/shader-bits/generateTextureBatchBit.mjs';
import { roundPixelsBitGl } from '../../high-shader/shader-bits/roundPixelsBit.mjs';
import { batchSamplersUniformGroup } from '../../renderers/gl/shader/batchSamplersUniformGroup.mjs';
import { Shader } from '../../renderers/shared/shader/Shader.mjs';
import { State } from '../../renderers/shared/state/State.mjs';
import { MAX_TEXTURES } from '../shared/const.mjs';

"use strict";
class GlBatchAdaptor {
  constructor() {
    this._didUpload = false;
    this._tempState = State.for2d();
  }
  init(batcherPipe) {
    const glProgram = compileHighShaderGlProgram({
      name: "batch",
      bits: [
        colorBitGl,
        generateTextureBatchBitGl(MAX_TEXTURES),
        roundPixelsBitGl
      ]
    });
    this._shader = new Shader({
      glProgram,
      resources: {
        batchSamplers: batchSamplersUniformGroup
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
    ExtensionType.WebGLPipesAdaptor
  ],
  name: "batch"
};

export { GlBatchAdaptor };
//# sourceMappingURL=GlBatchAdaptor.mjs.map
