'use strict';

var BindGroup = require('../../renderers/gpu/shader/BindGroup.js');
var Texture = require('../../renderers/shared/texture/Texture.js');
var _const = require('../shared/const.js');

"use strict";
const cachedGroups = {};
function getTextureBatchBindGroup(textures, size) {
  let uid = 0;
  for (let i = 0; i < size; i++) {
    uid = uid * 31 + textures[i].uid >>> 0;
  }
  return cachedGroups[uid] || generateTextureBatchBindGroup(textures, uid);
}
function generateTextureBatchBindGroup(textures, key) {
  const bindGroupResources = {};
  let bindIndex = 0;
  for (let i = 0; i < _const.MAX_TEXTURES; i++) {
    const texture = i < textures.length ? textures[i] : Texture.Texture.EMPTY.source;
    bindGroupResources[bindIndex++] = texture.source;
    bindGroupResources[bindIndex++] = texture.style;
  }
  const bindGroup = new BindGroup.BindGroup(bindGroupResources);
  cachedGroups[key] = bindGroup;
  return bindGroup;
}

exports.getTextureBatchBindGroup = getTextureBatchBindGroup;
//# sourceMappingURL=getTextureBatchBindGroup.js.map
