'use strict';

var Extensions = require('../../../extensions/Extensions.js');
var Matrix = require('../../../maths/matrix/Matrix.js');
var _const = require('../../../rendering/batcher/shared/const.js');
var compileHighShaderToProgram = require('../../../rendering/high-shader/compileHighShaderToProgram.js');
var colorBit = require('../../../rendering/high-shader/shader-bits/colorBit.js');
var generateTextureBatchBit = require('../../../rendering/high-shader/shader-bits/generateTextureBatchBit.js');
var localUniformBit = require('../../../rendering/high-shader/shader-bits/localUniformBit.js');
var roundPixelsBit = require('../../../rendering/high-shader/shader-bits/roundPixelsBit.js');
var batchSamplersUniformGroup = require('../../../rendering/renderers/gl/shader/batchSamplersUniformGroup.js');
var Shader = require('../../../rendering/renderers/shared/shader/Shader.js');
var UniformGroup = require('../../../rendering/renderers/shared/shader/UniformGroup.js');

"use strict";
class GlGraphicsAdaptor {
  init() {
    const uniforms = new UniformGroup.UniformGroup({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new Matrix.Matrix(), type: "mat3x3<f32>" },
      uRound: { value: 0, type: "f32" }
    });
    const glProgram = compileHighShaderToProgram.compileHighShaderGlProgram({
      name: "graphics",
      bits: [
        colorBit.colorBitGl,
        generateTextureBatchBit.generateTextureBatchBitGl(_const.MAX_TEXTURES),
        localUniformBit.localUniformBitGl,
        roundPixelsBit.roundPixelsBitGl
      ]
    });
    this.shader = new Shader.Shader({
      glProgram,
      resources: {
        localUniforms: uniforms,
        batchSamplers: batchSamplersUniformGroup.batchSamplersUniformGroup
      }
    });
  }
  execute(graphicsPipe, renderable) {
    const context = renderable.context;
    const shader = context.customShader || this.shader;
    const renderer = graphicsPipe.renderer;
    const contextSystem = renderer.graphicsContext;
    const {
      geometry,
      instructions
    } = contextSystem.getContextRenderData(context);
    shader.groups[0] = renderer.globalUniforms.bindGroup;
    renderer.shader.bind(shader);
    renderer.geometry.bind(geometry, shader.glProgram);
    const batches = instructions.instructions;
    for (let i = 0; i < instructions.instructionSize; i++) {
      const batch = batches[i];
      if (batch.size) {
        for (let j = 0; j < batch.textures.textures.length; j++) {
          renderer.texture.bind(batch.textures.textures[j], j);
        }
        renderer.geometry.draw("triangle-list", batch.size, batch.start);
      }
    }
  }
  destroy() {
    this.shader.destroy(true);
    this.shader = null;
  }
}
/** @ignore */
GlGraphicsAdaptor.extension = {
  type: [
    Extensions.ExtensionType.WebGLPipesAdaptor
  ],
  name: "graphics"
};

exports.GlGraphicsAdaptor = GlGraphicsAdaptor;
//# sourceMappingURL=GlGraphicsAdaptor.js.map
