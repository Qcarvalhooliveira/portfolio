'use strict';

var Extensions = require('../../../extensions/Extensions.js');
var Resolver = require('../Resolver.js');
var resolveTextureUrl = require('./resolveTextureUrl.js');

"use strict";
const resolveJsonUrl = {
  extension: Extensions.ExtensionType.ResolveParser,
  test: (value) => Resolver.Resolver.RETINA_PREFIX.test(value) && value.endsWith(".json"),
  parse: resolveTextureUrl.resolveTextureUrl.parse
};

exports.resolveJsonUrl = resolveJsonUrl;
//# sourceMappingURL=resolveJsonUrl.js.map
