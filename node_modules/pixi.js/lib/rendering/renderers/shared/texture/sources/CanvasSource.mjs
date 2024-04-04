import { DOMAdapter } from '../../../../../environment/adapter.mjs';
import { ExtensionType } from '../../../../../extensions/Extensions.mjs';
import { TextureSource } from './TextureSource.mjs';

"use strict";
class CanvasSource extends TextureSource {
  constructor(options) {
    if (!options.resource) {
      options.resource = DOMAdapter.get().createCanvas();
    }
    if (!options.width) {
      options.width = options.resource.width;
      if (!options.autoDensity) {
        options.width /= options.resolution;
      }
    }
    if (!options.height) {
      options.height = options.resource.height;
      if (!options.autoDensity) {
        options.height /= options.resolution;
      }
    }
    super(options);
    this.uploadMethodId = "image";
    this.autoDensity = options.autoDensity;
    const canvas = options.resource;
    if (this.pixelWidth !== canvas.width || this.pixelWidth !== canvas.height) {
      this.resizeCanvas();
    }
    this.transparent = !!options.transparent;
  }
  resizeCanvas() {
    if (this.autoDensity) {
      this.resource.style.width = `${this.width}px`;
      this.resource.style.height = `${this.height}px`;
    }
    if (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) {
      this.resource.width = this.pixelWidth;
      this.resource.height = this.pixelHeight;
    }
  }
  resize(width = this.width, height = this.height, resolution = this._resolution) {
    const didResize = super.resize(width, height, resolution);
    if (didResize) {
      this.resizeCanvas();
    }
    return didResize;
  }
  static test(resource) {
    return globalThis.HTMLCanvasElement && resource instanceof HTMLCanvasElement || globalThis.OffscreenCanvas && resource instanceof OffscreenCanvas;
  }
}
CanvasSource.extension = ExtensionType.TextureSource;

export { CanvasSource };
//# sourceMappingURL=CanvasSource.mjs.map
