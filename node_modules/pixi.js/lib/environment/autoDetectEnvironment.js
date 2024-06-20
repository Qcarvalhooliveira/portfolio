'use strict';

var Extensions = require('../extensions/Extensions.js');

"use strict";
const environments = [];
Extensions.extensions.handleByNamedList(Extensions.ExtensionType.Environment, environments);
async function autoDetectEnvironment(manageImports) {
  if (!manageImports)
    return;
  for (let i = 0; i < environments.length; i++) {
    const env = environments[i];
    if (env.value.test()) {
      await env.value.load();
      return;
    }
  }
}

exports.autoDetectEnvironment = autoDetectEnvironment;
//# sourceMappingURL=autoDetectEnvironment.js.map
