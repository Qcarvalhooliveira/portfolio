'use strict';

var AbstractText = require('../text/AbstractText.js');
var TextStyle = require('../text/TextStyle.js');
var BitmapFontManager = require('./BitmapFontManager.js');

"use strict";
class BitmapText extends AbstractText.AbstractText {
  constructor(...args) {
    var _a;
    const options = AbstractText.ensureOptions(args, "BitmapText");
    options.style ?? (options.style = options.style || {});
    (_a = options.style).fill ?? (_a.fill = 16777215);
    super(options, TextStyle.TextStyle);
    this.renderPipeId = "bitmapText";
  }
  _updateBounds() {
    const bounds = this._bounds;
    const padding = this._style.padding;
    const anchor = this._anchor;
    const bitmapMeasurement = BitmapFontManager.BitmapFontManager.measureText(this.text, this._style);
    const scale = bitmapMeasurement.scale;
    const offset = bitmapMeasurement.offsetY * scale;
    const width = bitmapMeasurement.width * scale;
    const height = bitmapMeasurement.height * scale;
    bounds.minX = -anchor._x * width - padding;
    bounds.maxX = bounds.minX + width;
    bounds.minY = -anchor._y * (height + offset) - padding;
    bounds.maxY = bounds.minY + height;
  }
}

exports.BitmapText = BitmapText;
//# sourceMappingURL=BitmapText.js.map
