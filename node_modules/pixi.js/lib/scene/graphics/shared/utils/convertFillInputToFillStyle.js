'use strict';

var Color = require('../../../../color/Color.js');
var Matrix = require('../../../../maths/matrix/Matrix.js');
var Texture = require('../../../../rendering/renderers/shared/texture/Texture.js');
var FillGradient = require('../fill/FillGradient.js');
var FillPattern = require('../fill/FillPattern.js');

"use strict";
function convertFillInputToFillStyle(value, defaultStyle) {
  if (value === void 0 || value === null) {
    return null;
  }
  let fillStyleToParse;
  let styleToMerge;
  if (value?.fill) {
    styleToMerge = value.fill;
    fillStyleToParse = { ...defaultStyle, ...value };
  } else {
    styleToMerge = value;
    fillStyleToParse = defaultStyle;
  }
  if (Color.Color.isColorLike(styleToMerge)) {
    const temp = Color.Color.shared.setValue(styleToMerge ?? 0);
    const opts = {
      ...fillStyleToParse,
      color: temp.toNumber(),
      alpha: temp.alpha === 1 ? fillStyleToParse.alpha : temp.alpha,
      texture: Texture.Texture.WHITE
    };
    return opts;
  } else if (styleToMerge instanceof FillPattern.FillPattern) {
    const pattern = styleToMerge;
    return {
      ...fillStyleToParse,
      color: 16777215,
      texture: pattern.texture,
      matrix: pattern.transform,
      fill: fillStyleToParse.fill ?? null
    };
  } else if (styleToMerge instanceof FillGradient.FillGradient) {
    const gradient = styleToMerge;
    gradient.buildLinearGradient();
    return {
      ...fillStyleToParse,
      color: 16777215,
      texture: gradient.texture,
      matrix: gradient.transform
    };
  }
  const style = { ...defaultStyle, ...value };
  if (style.texture) {
    if (style.texture !== Texture.Texture.WHITE) {
      const m = style.matrix?.invert() || new Matrix.Matrix();
      m.scale(
        1 / style.texture.frame.width,
        1 / style.texture.frame.height
      );
      style.matrix = m;
    }
    const sourceStyle = style.texture.source.style;
    if (sourceStyle.addressMode === "clamp-to-edge") {
      sourceStyle.addressMode = "repeat";
    }
  }
  const color = Color.Color.shared.setValue(style.color);
  style.alpha *= color.alpha;
  style.color = color.toNumber();
  style.matrix = style.matrix ? style.matrix.clone() : null;
  return style;
}

exports.convertFillInputToFillStyle = convertFillInputToFillStyle;
//# sourceMappingURL=convertFillInputToFillStyle.js.map
