import { Color } from '../../../../color/Color.mjs';
import { Matrix } from '../../../../maths/matrix/Matrix.mjs';
import { Texture } from '../../../../rendering/renderers/shared/texture/Texture.mjs';
import { FillGradient } from '../fill/FillGradient.mjs';
import { FillPattern } from '../fill/FillPattern.mjs';

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
  if (Color.isColorLike(styleToMerge)) {
    const temp = Color.shared.setValue(styleToMerge ?? 0);
    const opts = {
      ...fillStyleToParse,
      color: temp.toNumber(),
      alpha: temp.alpha === 1 ? fillStyleToParse.alpha : temp.alpha,
      texture: Texture.WHITE
    };
    return opts;
  } else if (styleToMerge instanceof FillPattern) {
    const pattern = styleToMerge;
    return {
      ...fillStyleToParse,
      color: 16777215,
      texture: pattern.texture,
      matrix: pattern.transform,
      fill: fillStyleToParse.fill ?? null
    };
  } else if (styleToMerge instanceof FillGradient) {
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
    if (style.texture !== Texture.WHITE) {
      const m = style.matrix?.invert() || new Matrix();
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
  const color = Color.shared.setValue(style.color);
  style.alpha *= color.alpha;
  style.color = color.toNumber();
  style.matrix = style.matrix ? style.matrix.clone() : null;
  return style;
}

export { convertFillInputToFillStyle };
//# sourceMappingURL=convertFillInputToFillStyle.mjs.map
