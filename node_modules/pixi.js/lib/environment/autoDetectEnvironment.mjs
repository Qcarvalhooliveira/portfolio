import { extensions, ExtensionType } from '../extensions/Extensions.mjs';

"use strict";
const environments = [];
extensions.handleByNamedList(ExtensionType.Environment, environments);
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

export { autoDetectEnvironment };
//# sourceMappingURL=autoDetectEnvironment.mjs.map
