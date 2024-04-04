import { Color } from '../../../../color/Color.mjs';
import { DOMAdapter } from '../../../../environment/adapter.mjs';
import { Matrix } from '../../../../maths/matrix/Matrix.mjs';
import { ImageSource } from '../../../../rendering/renderers/shared/texture/sources/ImageSource.mjs';
import { Texture } from '../../../../rendering/renderers/shared/texture/Texture.mjs';
import { uid } from '../../../../utils/data/uid.mjs';

"use strict";
const _FillGradient = class _FillGradient {
  constructor(x0, y0, x1, y1) {
    this.uid = uid("fillGradient");
    this.type = "linear";
    this.gradientStops = [];
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }
  addColorStop(offset, color) {
    this.gradientStops.push({ offset, color: Color.shared.setValue(color).toHex() });
    return this;
  }
  // TODO move to the system!
  buildLinearGradient() {
    const defaultSize = _FillGradient.defaultTextureSize;
    const { gradientStops } = this;
    const canvas = DOMAdapter.get().createCanvas();
    canvas.width = defaultSize;
    canvas.height = defaultSize;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, _FillGradient.defaultTextureSize, 1);
    for (let i = 0; i < gradientStops.length; i++) {
      const stop = gradientStops[i];
      gradient.addColorStop(stop.offset, stop.color);
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, defaultSize, defaultSize);
    this.texture = new Texture({
      source: new ImageSource({
        resource: canvas,
        addressModeU: "clamp-to-edge",
        addressModeV: "repeat"
      })
    });
    const { x0, y0, x1, y1 } = this;
    const m = new Matrix();
    const dx = x1 - x0;
    const dy = y1 - y0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    m.translate(-x0, -y0);
    m.scale(1 / defaultSize, 1 / defaultSize);
    m.rotate(-angle);
    m.scale(256 / dist, 1);
    this.transform = m;
  }
};
_FillGradient.defaultTextureSize = 256;
let FillGradient = _FillGradient;

export { FillGradient };
//# sourceMappingURL=FillGradient.mjs.map
