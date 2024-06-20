'use strict';

var mixColors = require('../../container/utils/mixColors.js');

"use strict";
class BatchableGraphics {
  constructor() {
    this.batcher = null;
    this.batch = null;
    this.applyTransform = true;
    this.roundPixels = 0;
  }
  get blendMode() {
    if (this.applyTransform) {
      return this.renderable.groupBlendMode;
    }
    return "normal";
  }
  packIndex(indexBuffer, index, indicesOffset) {
    const indices = this.geometryData.indices;
    for (let i = 0; i < this.indexSize; i++) {
      indexBuffer[index++] = indices[i + this.indexOffset] + indicesOffset - this.vertexOffset;
    }
  }
  packAttributes(float32View, uint32View, index, textureId) {
    const geometry = this.geometryData;
    const graphics = this.renderable;
    const positions = geometry.vertices;
    const uvs = geometry.uvs;
    const offset = this.vertexOffset * 2;
    const vertSize = (this.vertexOffset + this.vertexSize) * 2;
    const rgb = this.color;
    const bgr = rgb >> 16 | rgb & 65280 | (rgb & 255) << 16;
    if (this.applyTransform) {
      const argb = mixColors.mixColors(bgr, graphics.groupColor) + (this.alpha * graphics.groupAlpha * 255 << 24);
      const wt = graphics.groupTransform;
      const textureIdAndRound = textureId << 16 | this.roundPixels & 65535;
      const a = wt.a;
      const b = wt.b;
      const c = wt.c;
      const d = wt.d;
      const tx = wt.tx;
      const ty = wt.ty;
      for (let i = offset; i < vertSize; i += 2) {
        const x = positions[i];
        const y = positions[i + 1];
        float32View[index] = a * x + c * y + tx;
        float32View[index + 1] = b * x + d * y + ty;
        float32View[index + 2] = uvs[i];
        float32View[index + 3] = uvs[i + 1];
        uint32View[index + 4] = argb;
        uint32View[index + 5] = textureIdAndRound;
        index += 6;
      }
    } else {
      const argb = bgr + (this.alpha * 255 << 24);
      for (let i = offset; i < vertSize; i += 2) {
        float32View[index] = positions[i];
        float32View[index + 1] = positions[i + 1];
        float32View[index + 2] = uvs[i];
        float32View[index + 3] = uvs[i + 1];
        uint32View[index + 4] = argb;
        uint32View[index + 5] = textureId << 16;
        index += 6;
      }
    }
  }
  // TODO rename to vertexSize
  get vertSize() {
    return this.vertexSize;
  }
  copyTo(gpuBuffer) {
    gpuBuffer.indexOffset = this.indexOffset;
    gpuBuffer.indexSize = this.indexSize;
    gpuBuffer.vertexOffset = this.vertexOffset;
    gpuBuffer.vertexSize = this.vertexSize;
    gpuBuffer.color = this.color;
    gpuBuffer.alpha = this.alpha;
    gpuBuffer.texture = this.texture;
    gpuBuffer.geometryData = this.geometryData;
  }
  reset() {
    this.applyTransform = true;
  }
}

exports.BatchableGraphics = BatchableGraphics;
//# sourceMappingURL=BatchableGraphics.js.map
