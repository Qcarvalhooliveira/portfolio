import { ExtensionType } from '../../../../extensions/Extensions.mjs';
import { ensureAttributes } from '../../gl/shader/program/ensureAttributes.mjs';
import { STENCIL_MODES } from '../../shared/state/const.mjs';
import { createIdFromString } from '../../shared/utils/createIdFromString.mjs';
import { GpuStencilModesToPixi } from '../state/GpuStencilModesToPixi.mjs';

"use strict";
const topologyStringToId = {
  "point-list": 0,
  "line-list": 1,
  "line-strip": 2,
  "triangle-list": 3,
  "triangle-strip": 4
};
function getGraphicsStateKey(geometryLayout, shaderKey, state, blendMode, topology) {
  return geometryLayout << 24 | shaderKey << 16 | state << 10 | blendMode << 5 | topology;
}
function getGlobalStateKey(stencilStateId, multiSampleCount, colorMask, renderTarget) {
  return colorMask << 6 | stencilStateId << 3 | renderTarget << 1 | multiSampleCount;
}
class PipelineSystem {
  constructor(renderer) {
    this._moduleCache = /* @__PURE__ */ Object.create(null);
    this._bufferLayoutsCache = /* @__PURE__ */ Object.create(null);
    this._pipeCache = /* @__PURE__ */ Object.create(null);
    this._pipeStateCaches = /* @__PURE__ */ Object.create(null);
    this._colorMask = 15;
    this._multisampleCount = 1;
    this._renderer = renderer;
  }
  contextChange(gpu) {
    this._gpu = gpu;
    this.setStencilMode(STENCIL_MODES.DISABLED);
    this._updatePipeHash();
  }
  setMultisampleCount(multisampleCount) {
    if (this._multisampleCount === multisampleCount)
      return;
    this._multisampleCount = multisampleCount;
    this._updatePipeHash();
  }
  setRenderTarget(renderTarget) {
    this._multisampleCount = renderTarget.msaaSamples;
    this._depthStencilAttachment = renderTarget.descriptor.depthStencilAttachment ? 1 : 0;
    this._updatePipeHash();
  }
  setColorMask(colorMask) {
    if (this._colorMask === colorMask)
      return;
    this._colorMask = colorMask;
    this._updatePipeHash();
  }
  setStencilMode(stencilMode) {
    if (this._stencilMode === stencilMode)
      return;
    this._stencilMode = stencilMode;
    this._stencilState = GpuStencilModesToPixi[stencilMode];
    this._updatePipeHash();
  }
  setPipeline(geometry, program, state, passEncoder) {
    const pipeline = this.getPipeline(geometry, program, state);
    passEncoder.setPipeline(pipeline);
  }
  getPipeline(geometry, program, state, topology) {
    if (!geometry._layoutKey) {
      ensureAttributes(geometry, program.attributeData);
      this._generateBufferKey(geometry);
    }
    topology = topology || geometry.topology;
    const key = getGraphicsStateKey(
      geometry._layoutKey,
      program._layoutKey,
      state.data,
      state._blendModeId,
      topologyStringToId[topology]
    );
    if (this._pipeCache[key])
      return this._pipeCache[key];
    this._pipeCache[key] = this._createPipeline(geometry, program, state, topology);
    return this._pipeCache[key];
  }
  _createPipeline(geometry, program, state, topology) {
    const device = this._gpu.device;
    const buffers = this._createVertexBufferLayouts(geometry);
    const blendModes = this._renderer.state.getColorTargets(state);
    blendModes[0].writeMask = this._stencilMode === STENCIL_MODES.RENDERING_MASK_ADD ? 0 : this._colorMask;
    const layout = this._renderer.shader.getProgramData(program).pipeline;
    const descriptor = {
      // TODO later check if its helpful to create..
      // layout,
      vertex: {
        module: this._getModule(program.vertex.source),
        entryPoint: program.vertex.entryPoint,
        // geometry..
        buffers
      },
      fragment: {
        module: this._getModule(program.fragment.source),
        entryPoint: program.fragment.entryPoint,
        targets: blendModes
      },
      primitive: {
        topology,
        cullMode: state.cullMode
      },
      layout,
      multisample: {
        count: this._multisampleCount
      },
      // depthStencil,
      label: `PIXI Pipeline`
    };
    if (this._depthStencilAttachment) {
      descriptor.depthStencil = {
        ...this._stencilState,
        format: "depth24plus-stencil8",
        depthWriteEnabled: state.depthTest,
        depthCompare: state.depthTest ? "less" : "always"
      };
    }
    const pipeline = device.createRenderPipeline(descriptor);
    return pipeline;
  }
  _getModule(code) {
    return this._moduleCache[code] || this._createModule(code);
  }
  _createModule(code) {
    const device = this._gpu.device;
    this._moduleCache[code] = device.createShaderModule({
      code
    });
    return this._moduleCache[code];
  }
  _generateBufferKey(geometry) {
    const keyGen = [];
    let index = 0;
    const attributeKeys = Object.keys(geometry.attributes).sort();
    for (let i = 0; i < attributeKeys.length; i++) {
      const attribute = geometry.attributes[attributeKeys[i]];
      keyGen[index++] = attribute.location;
      keyGen[index++] = attribute.offset;
      keyGen[index++] = attribute.format;
      keyGen[index++] = attribute.stride;
    }
    const stringKey = keyGen.join("");
    geometry._layoutKey = createIdFromString(stringKey, "geometry");
    return geometry._layoutKey;
  }
  _createVertexBufferLayouts(geometry) {
    if (this._bufferLayoutsCache[geometry._layoutKey]) {
      return this._bufferLayoutsCache[geometry._layoutKey];
    }
    const vertexBuffersLayout = [];
    geometry.buffers.forEach((buffer) => {
      const bufferEntry = {
        arrayStride: 0,
        stepMode: "vertex",
        attributes: []
      };
      const bufferEntryAttributes = bufferEntry.attributes;
      for (const i in geometry.attributes) {
        const attribute = geometry.attributes[i];
        if (attribute.buffer === buffer) {
          bufferEntry.arrayStride = attribute.stride;
          bufferEntry.stepMode = attribute.instance ? "instance" : "vertex";
          bufferEntryAttributes.push({
            shaderLocation: attribute.location,
            offset: attribute.offset,
            format: attribute.format
          });
        }
      }
      if (bufferEntryAttributes.length) {
        vertexBuffersLayout.push(bufferEntry);
      }
    });
    this._bufferLayoutsCache[geometry._layoutKey] = vertexBuffersLayout;
    return vertexBuffersLayout;
  }
  _updatePipeHash() {
    const key = getGlobalStateKey(
      this._stencilMode,
      this._multisampleCount,
      this._colorMask,
      this._depthStencilAttachment
    );
    if (!this._pipeStateCaches[key]) {
      this._pipeStateCaches[key] = /* @__PURE__ */ Object.create(null);
    }
    this._pipeCache = this._pipeStateCaches[key];
  }
  destroy() {
    this._renderer = null;
    this._bufferLayoutsCache = null;
  }
}
/** @ignore */
PipelineSystem.extension = {
  type: [ExtensionType.WebGPUSystem],
  name: "pipeline"
};

export { PipelineSystem };
//# sourceMappingURL=PipelineSystem.mjs.map
