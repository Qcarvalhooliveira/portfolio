import { ExtensionType } from '../../../extensions/Extensions.mjs';
import { compileHighShaderGpuProgram } from '../../high-shader/compileHighShaderToProgram.mjs';
import { colorBit } from '../../high-shader/shader-bits/colorBit.mjs';
import { generateTextureBatchBit } from '../../high-shader/shader-bits/generateTextureBatchBit.mjs';
import { roundPixelsBit } from '../../high-shader/shader-bits/roundPixelsBit.mjs';
import { Shader } from '../../renderers/shared/shader/Shader.mjs';
import { State } from '../../renderers/shared/state/State.mjs';
import { MAX_TEXTURES } from '../shared/const.mjs';
import { getTextureBatchBindGroup } from './getTextureBatchBindGroup.mjs';

"use strict";
const tempState = State.for2d();
class GpuBatchAdaptor {
  init() {
    const gpuProgram = compileHighShaderGpuProgram({
      name: "batch",
      bits: [
        colorBit,
        generateTextureBatchBit(MAX_TEXTURES),
        roundPixelsBit
      ]
    });
    this._shader = new Shader({
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
      batch.bindGroup = getTextureBatchBindGroup(textureBatch.textures, textureBatch.count);
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
    ExtensionType.WebGPUPipesAdaptor
  ],
  name: "batch"
};

export { GpuBatchAdaptor };
//# sourceMappingURL=GpuBatchAdaptor.mjs.map
