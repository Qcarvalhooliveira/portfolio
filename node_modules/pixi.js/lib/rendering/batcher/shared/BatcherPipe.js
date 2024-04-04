'use strict';

var Extensions = require('../../../extensions/Extensions.js');
var State = require('../../renderers/shared/state/State.js');
var BatchGeometry = require('../gpu/BatchGeometry.js');
var Batcher = require('./Batcher.js');

"use strict";
class BatcherPipe {
  constructor(renderer, adaptor) {
    this.state = State.State.for2d();
    this._batches = /* @__PURE__ */ Object.create(null);
    this._geometries = /* @__PURE__ */ Object.create(null);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init(this);
  }
  buildStart(instructionSet) {
    if (!this._batches[instructionSet.uid]) {
      const batcher = new Batcher.Batcher();
      this._batches[instructionSet.uid] = batcher;
      this._geometries[batcher.uid] = new BatchGeometry.BatchGeometry();
    }
    this._activeBatch = this._batches[instructionSet.uid];
    this._activeGeometry = this._geometries[this._activeBatch.uid];
    this._activeBatch.begin();
  }
  addToBatch(batchableObject) {
    this._activeBatch.add(batchableObject);
  }
  break(instructionSet) {
    this._activeBatch.break(instructionSet);
  }
  buildEnd(instructionSet) {
    const activeBatch = this._activeBatch;
    const geometry = this._activeGeometry;
    activeBatch.finish(instructionSet);
    geometry.indexBuffer.setDataWithSize(activeBatch.indexBuffer, activeBatch.indexSize, true);
    geometry.buffers[0].setDataWithSize(activeBatch.attributeBuffer.float32View, activeBatch.attributeSize, false);
  }
  upload(instructionSet) {
    const batcher = this._batches[instructionSet.uid];
    const geometry = this._geometries[batcher.uid];
    if (batcher.dirty) {
      batcher.dirty = false;
      geometry.buffers[0].update(batcher.attributeSize * 4);
    }
  }
  execute(batch) {
    if (batch.action === "startBatch") {
      const batcher = batch.batcher;
      const geometry = this._geometries[batcher.uid];
      this._adaptor.start(this, geometry);
    }
    this._adaptor.execute(this, batch);
  }
  destroy() {
    this.state = null;
    this.renderer = null;
    this._adaptor.destroy();
    this._adaptor = null;
    for (const i in this._batches) {
      this._batches[i].destroy();
    }
    this._batches = null;
    for (const i in this._geometries) {
      this._geometries[i].destroy();
    }
    this._geometries = null;
  }
}
/** @ignore */
BatcherPipe.extension = {
  type: [
    Extensions.ExtensionType.WebGLPipes,
    Extensions.ExtensionType.WebGPUPipes,
    Extensions.ExtensionType.CanvasPipes
  ],
  name: "batch"
};

exports.BatcherPipe = BatcherPipe;
//# sourceMappingURL=BatcherPipe.js.map
