import { uid } from '../../../utils/data/uid.mjs';
import { ViewableBuffer } from '../../../utils/data/ViewableBuffer.mjs';
import { fastCopy } from '../../renderers/shared/buffer/utils/fastCopy.mjs';
import { getAdjustedBlendModeBlend } from '../../renderers/shared/state/getAdjustedBlendModeBlend.mjs';
import { BatchTextureArray } from './BatchTextureArray.mjs';
import { MAX_TEXTURES } from './const.mjs';

"use strict";
class Batch {
  constructor() {
    this.renderPipeId = "batch";
    this.action = "startBatch";
    // TODO - eventually this could be useful for flagging batches as dirty and then only rebuilding those ones
    // public elementStart = 0;
    // public elementSize = 0;
    // for drawing..
    this.start = 0;
    this.size = 0;
    this.blendMode = "normal";
    this.canBundle = true;
  }
  destroy() {
    this.textures = null;
    this.gpuBindGroup = null;
    this.bindGroup = null;
    this.batcher = null;
  }
}
let BATCH_TICK = 0;
const _Batcher = class _Batcher {
  constructor(options = {}) {
    this.uid = uid("batcher");
    this.dirty = true;
    this.batchIndex = 0;
    this.batches = [];
    // specifics.
    this._vertexSize = 6;
    this._elements = [];
    this._batchPool = [];
    this._batchPoolIndex = 0;
    this._textureBatchPool = [];
    this._textureBatchPoolIndex = 0;
    options = { ..._Batcher.defaultOptions, ...options };
    const { vertexSize, indexSize } = options;
    this.attributeBuffer = new ViewableBuffer(vertexSize * this._vertexSize * 4);
    this.indexBuffer = new Uint16Array(indexSize);
  }
  begin() {
    this.batchIndex = 0;
    this.elementSize = 0;
    this.elementStart = 0;
    this.indexSize = 0;
    this.attributeSize = 0;
    this._batchPoolIndex = 0;
    this._textureBatchPoolIndex = 0;
    this._batchIndexStart = 0;
    this._batchIndexSize = 0;
    this.dirty = true;
  }
  add(batchableObject) {
    this._elements[this.elementSize++] = batchableObject;
    batchableObject.indexStart = this.indexSize;
    batchableObject.location = this.attributeSize;
    batchableObject.batcher = this;
    this.indexSize += batchableObject.indexSize;
    this.attributeSize += batchableObject.vertexSize * this._vertexSize;
  }
  checkAndUpdateTexture(batchableObject, texture) {
    const textureId = batchableObject.batch.textures.ids[texture._source.uid];
    if (!textureId && textureId !== 0)
      return false;
    batchableObject.textureId = textureId;
    batchableObject.texture = texture;
    return true;
  }
  updateElement(batchableObject) {
    this.dirty = true;
    batchableObject.packAttributes(
      this.attributeBuffer.float32View,
      this.attributeBuffer.uint32View,
      batchableObject.location,
      batchableObject.textureId
    );
  }
  /**
   * breaks the batcher. This happens when a batch gets too big,
   * or we need to switch to a different type of rendering (a filter for example)
   * @param instructionSet
   */
  break(instructionSet) {
    const elements = this._elements;
    let textureBatch = this._textureBatchPool[this._textureBatchPoolIndex++] || new BatchTextureArray();
    textureBatch.clear();
    if (!elements[this.elementStart])
      return;
    const firstElement = elements[this.elementStart];
    let blendMode = getAdjustedBlendModeBlend(firstElement.blendMode, firstElement.texture._source);
    if (this.attributeSize * 4 > this.attributeBuffer.size) {
      this._resizeAttributeBuffer(this.attributeSize * 4);
    }
    if (this.indexSize > this.indexBuffer.length) {
      this._resizeIndexBuffer(this.indexSize);
    }
    const f32 = this.attributeBuffer.float32View;
    const u32 = this.attributeBuffer.uint32View;
    const iBuffer = this.indexBuffer;
    let size = this._batchIndexSize;
    let start = this._batchIndexStart;
    let action = "startBatch";
    let batch = this._batchPool[this._batchPoolIndex++] || new Batch();
    for (let i = this.elementStart; i < this.elementSize; ++i) {
      const element = elements[i];
      elements[i] = null;
      const texture = element.texture;
      const source = texture._source;
      const adjustedBlendMode = getAdjustedBlendModeBlend(element.blendMode, source);
      const blendModeChange = blendMode !== adjustedBlendMode;
      if (source._batchTick === BATCH_TICK && !blendModeChange) {
        element.textureId = source._textureBindLocation;
        size += element.indexSize;
        element.packAttributes(f32, u32, element.location, element.textureId);
        element.packIndex(iBuffer, element.indexStart, element.location / this._vertexSize);
        element.batch = batch;
        continue;
      }
      source._batchTick = BATCH_TICK;
      if (textureBatch.count >= MAX_TEXTURES || blendModeChange) {
        this._finishBatch(
          batch,
          start,
          size - start,
          textureBatch,
          blendMode,
          instructionSet,
          action
        );
        action = "renderBatch";
        start = size;
        blendMode = adjustedBlendMode;
        textureBatch = this._textureBatchPool[this._textureBatchPoolIndex++] || new BatchTextureArray();
        textureBatch.clear();
        batch = this._batchPool[this._batchPoolIndex++] || new Batch();
        ++BATCH_TICK;
      }
      element.textureId = source._textureBindLocation = textureBatch.count;
      textureBatch.ids[source.uid] = textureBatch.count;
      textureBatch.textures[textureBatch.count++] = source;
      element.batch = batch;
      size += element.indexSize;
      element.packAttributes(f32, u32, element.location, element.textureId);
      element.packIndex(iBuffer, element.indexStart, element.location / this._vertexSize);
    }
    if (textureBatch.count > 0) {
      this._finishBatch(
        batch,
        start,
        size - start,
        textureBatch,
        blendMode,
        instructionSet,
        action
      );
      start = size;
      ++BATCH_TICK;
    }
    this.elementStart = this.elementSize;
    this._batchIndexStart = start;
    this._batchIndexSize = size;
  }
  _finishBatch(batch, indexStart, indexSize, textureBatch, blendMode, instructionSet, action) {
    batch.gpuBindGroup = null;
    batch.action = action;
    batch.batcher = this;
    batch.textures = textureBatch;
    batch.blendMode = blendMode;
    batch.start = indexStart;
    batch.size = indexSize;
    ++BATCH_TICK;
    instructionSet.add(batch);
  }
  finish(instructionSet) {
    this.break(instructionSet);
  }
  /**
   * Resizes the attribute buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureAttributeBuffer(size) {
    if (size * 4 <= this.attributeBuffer.size)
      return;
    this._resizeAttributeBuffer(size * 4);
  }
  /**
   * Resizes the index buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureIndexBuffer(size) {
    if (size <= this.indexBuffer.length)
      return;
    this._resizeIndexBuffer(size);
  }
  _resizeAttributeBuffer(size) {
    const newSize = Math.max(size, this.attributeBuffer.size * 2);
    const newArrayBuffer = new ViewableBuffer(newSize);
    fastCopy(this.attributeBuffer.rawBinaryData, newArrayBuffer.rawBinaryData);
    this.attributeBuffer = newArrayBuffer;
  }
  _resizeIndexBuffer(size) {
    const indexBuffer = this.indexBuffer;
    let newSize = Math.max(size, indexBuffer.length * 1.5);
    newSize += newSize % 2;
    const newIndexBuffer = newSize > 65535 ? new Uint32Array(newSize) : new Uint16Array(newSize);
    if (newIndexBuffer.BYTES_PER_ELEMENT !== indexBuffer.BYTES_PER_ELEMENT) {
      for (let i = 0; i < indexBuffer.length; i++) {
        newIndexBuffer[i] = indexBuffer[i];
      }
    } else {
      fastCopy(indexBuffer.buffer, newIndexBuffer.buffer);
    }
    this.indexBuffer = newIndexBuffer;
  }
  destroy() {
    for (let i = 0; i < this.batches.length; i++) {
      this.batches[i].destroy();
    }
    this.batches = null;
    for (let i = 0; i < this._elements.length; i++) {
      this._elements[i].batch = null;
    }
    this._elements = null;
    this.indexBuffer = null;
    this.attributeBuffer.destroy();
    this.attributeBuffer = null;
  }
};
_Batcher.defaultOptions = {
  vertexSize: 4,
  indexSize: 6
};
let Batcher = _Batcher;

export { Batch, Batcher };
//# sourceMappingURL=Batcher.mjs.map
