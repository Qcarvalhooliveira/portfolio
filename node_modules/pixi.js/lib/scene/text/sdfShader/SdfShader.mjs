import { Matrix } from '../../../maths/matrix/Matrix.mjs';
import { MAX_TEXTURES } from '../../../rendering/batcher/shared/const.mjs';
import { compileHighShaderGpuProgram, compileHighShaderGlProgram } from '../../../rendering/high-shader/compileHighShaderToProgram.mjs';
import { colorBit, colorBitGl } from '../../../rendering/high-shader/shader-bits/colorBit.mjs';
import { generateTextureBatchBit, generateTextureBatchBitGl } from '../../../rendering/high-shader/shader-bits/generateTextureBatchBit.mjs';
import { roundPixelsBit, roundPixelsBitGl } from '../../../rendering/high-shader/shader-bits/roundPixelsBit.mjs';
import { batchSamplersUniformGroup } from '../../../rendering/renderers/gl/shader/batchSamplersUniformGroup.mjs';
import { Shader } from '../../../rendering/renderers/shared/shader/Shader.mjs';
import { UniformGroup } from '../../../rendering/renderers/shared/shader/UniformGroup.mjs';
import { localUniformMSDFBit, localUniformMSDFBitGl } from './shader-bits/localUniformMSDFBit.mjs';
import { mSDFBit, mSDFBitGl } from './shader-bits/mSDFBit.mjs';

"use strict";
class SdfShader extends Shader {
  constructor() {
    const uniforms = new UniformGroup({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    });
    const gpuProgram = compileHighShaderGpuProgram({
      name: "sdf-shader",
      bits: [
        colorBit,
        generateTextureBatchBit(MAX_TEXTURES),
        localUniformMSDFBit,
        mSDFBit,
        roundPixelsBit
      ]
    });
    const glProgram = compileHighShaderGlProgram({
      name: "sdf-shader",
      bits: [
        colorBitGl,
        generateTextureBatchBitGl(MAX_TEXTURES),
        localUniformMSDFBitGl,
        mSDFBitGl,
        roundPixelsBitGl
      ]
    });
    super({
      glProgram,
      gpuProgram,
      resources: {
        localUniforms: uniforms,
        batchSamplers: batchSamplersUniformGroup
      }
    });
  }
}

export { SdfShader };
//# sourceMappingURL=SdfShader.mjs.map
