'use strict';

var Color = require('../../../../color/Color.js');
var adapter = require('../../../../environment/adapter.js');
var Matrix = require('../../../../maths/matrix/Matrix.js');
var ImageSource = require('../../../../rendering/renderers/shared/texture/sources/ImageSource.js');
var Texture = require('../../../../rendering/renderers/shared/texture/Texture.js');
var uid = require('../../../../utils/data/uid.js');

"use strict";
const _FillGradient = class _FillGradient {
  constructor(x0, y0, x1, y1) {
    this.uid = uid.uid("fillGradient");
    this.type = "linear";
    this.gradientStops = [];
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }
  addColorStop(offset, color) {
    this.gradientStops.push({ offset, color: Color.Color.shared.setValue(color).toHex() });
    return this;
  }
  // TODO move to the system!
  buildLinearGradient() {
    const defaultSize = _FillGradient.defaultTextureSize;
    const { gradientStops } = this;
    const canvas = adapter.DOMAdapter.get().createCanvas();
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
    this.texture = new Texture.Texture({
      source: new ImageSource.ImageSource({
        resource: canvas,
        addressModeU: "clamp-to-edge",
        addressModeV: "repeat"
      })
    });
    const { x0, y0, x1, y1 } = this;
    const m = new Matrix.Matrix();
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

exports.FillGradient = FillGradient;
//# sourceMappingURL=FillGradient.js.map
