'use strict';

var Extensions = require('../../extensions/Extensions.js');
var PoolGroup = require('../../utils/pool/PoolGroup.js');
var BatchableMesh = require('../mesh/shared/BatchableMesh.js');
var NineSliceGeometry = require('./NineSliceGeometry.js');

"use strict";
class NineSliceSpritePipe {
  constructor(renderer) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null);
    this._renderer = renderer;
  }
  addRenderable(sprite, _instructionSet) {
    const gpuSprite = this._getGpuSprite(sprite);
    if (sprite._didSpriteUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    this._renderer.renderPipes.batch.addToBatch(gpuSprite);
  }
  updateRenderable(sprite) {
    const gpuSprite = this._gpuSpriteHash[sprite.uid];
    if (sprite._didSpriteUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    gpuSprite.batcher.updateElement(gpuSprite);
  }
  validateRenderable(sprite) {
    const texture = sprite._texture;
    const gpuSprite = this._getGpuSprite(sprite);
    if (gpuSprite.texture._source !== texture._source) {
      return !gpuSprite.batcher.checkAndUpdateTexture(gpuSprite, texture);
    }
    return false;
  }
  destroyRenderable(sprite) {
    const batchableSprite = this._gpuSpriteHash[sprite.uid];
    PoolGroup.BigPool.return(batchableSprite);
    this._gpuSpriteHash[sprite.uid] = null;
  }
  _updateBatchableSprite(sprite, batchableSprite) {
    sprite._didSpriteUpdate = false;
    batchableSprite.geometry.update(sprite);
    batchableSprite.texture = sprite._texture;
  }
  _getGpuSprite(sprite) {
    return this._gpuSpriteHash[sprite.uid] || this._initGPUSprite(sprite);
  }
  _initGPUSprite(sprite) {
    const batchableMesh = new BatchableMesh.BatchableMesh();
    batchableMesh.geometry = new NineSliceGeometry.NineSliceGeometry();
    batchableMesh.mesh = sprite;
    batchableMesh.texture = sprite._texture;
    batchableMesh.roundPixels = this._renderer._roundPixels | sprite._roundPixels;
    this._gpuSpriteHash[sprite.uid] = batchableMesh;
    sprite.on("destroyed", () => {
      this.destroyRenderable(sprite);
    });
    return batchableMesh;
  }
  destroy() {
    for (const i in this._gpuSpriteHash) {
      const batchableMesh = this._gpuSpriteHash[i];
      batchableMesh.geometry.destroy();
    }
    this._gpuSpriteHash = null;
    this._renderer = null;
  }
}
/** @ignore */
NineSliceSpritePipe.extension = {
  type: [
    Extensions.ExtensionType.WebGLPipes,
    Extensions.ExtensionType.WebGPUPipes,
    Extensions.ExtensionType.CanvasPipes
  ],
  name: "nineSliceSprite"
};

exports.NineSliceSpritePipe = NineSliceSpritePipe;
//# sourceMappingURL=NineSliceSpritePipe.js.map
