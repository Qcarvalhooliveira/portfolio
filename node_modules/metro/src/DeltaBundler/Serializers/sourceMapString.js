"use strict";

const { sourceMapGenerator } = require("./sourceMapGenerator");
function sourceMapString(modules, options) {
  return sourceMapGenerator(modules, options).toString(undefined, {
    excludeSource: options.excludeSource,
  });
}
module.exports = sourceMapString;
