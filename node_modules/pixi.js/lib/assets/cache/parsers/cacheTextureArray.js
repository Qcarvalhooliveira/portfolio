'use strict';

var Extensions = require('../../../extensions/Extensions.js');
var Texture = require('../../../rendering/renderers/shared/texture/Texture.js');

"use strict";
const cacheTextureArray = {
  extension: Extensions.ExtensionType.CacheParser,
  test: (asset) => Array.isArray(asset) && asset.every((t) => t instanceof Texture.Texture),
  getCacheableAssets: (keys, asset) => {
    const out = {};
    keys.forEach((key) => {
      asset.forEach((item, i) => {
        out[key + (i === 0 ? "" : i + 1)] = item;
      });
    });
    return out;
  }
};

exports.cacheTextureArray = cacheTextureArray;
//# sourceMappingURL=cacheTextureArray.js.map
