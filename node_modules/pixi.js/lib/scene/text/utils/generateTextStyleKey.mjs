"use strict";
const valuesToIterateForKeys = [
  "_fontFamily",
  "_fontStyle",
  "_fontSize",
  "_fontVariant",
  "_fontWeight",
  "_breakWords",
  "_align",
  "_leading",
  "_letterSpacing",
  "_lineHeight",
  "_textBaseline",
  "_whiteSpace",
  "_wordWrap",
  "_wordWrapWidth",
  "_padding",
  "_cssOverrides",
  "_trim"
];
function generateTextStyleKey(style) {
  const key = [];
  let index = 0;
  for (let i = 0; i < valuesToIterateForKeys.length; i++) {
    const prop = valuesToIterateForKeys[i];
    key[index++] = style[prop];
  }
  index = addFillStyleKey(style._fill, key, index);
  index = addStokeStyleKey(style._stroke, key, index);
  return key.join("-");
}
function addFillStyleKey(fillStyle, key, index) {
  if (!fillStyle)
    return index;
  key[index++] = fillStyle.color;
  key[index++] = fillStyle.alpha;
  key[index++] = fillStyle.fill?.uid;
  return index;
}
function addStokeStyleKey(strokeStyle, key, index) {
  if (!strokeStyle)
    return index;
  index = addFillStyleKey(strokeStyle, key, index);
  key[index++] = strokeStyle.width;
  key[index++] = strokeStyle.alignment;
  key[index++] = strokeStyle.cap;
  key[index++] = strokeStyle.join;
  key[index++] = strokeStyle.miterLimit;
  return index;
}

export { generateTextStyleKey };
//# sourceMappingURL=generateTextStyleKey.mjs.map
