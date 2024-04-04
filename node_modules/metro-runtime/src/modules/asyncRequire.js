"use strict";

const DEFAULT_OPTIONS = {
  isPrefetchOnly: false,
};
async function asyncRequireImpl(moduleID, paths, options) {
  const loadBundle = global[`${__METRO_GLOBAL_PREFIX__}__loadBundleAsync`];
  if (loadBundle != null) {
    const stringModuleID = String(moduleID);
    if (paths != null) {
      const bundlePath = paths[stringModuleID];
      if (bundlePath != null) {
        await loadBundle(bundlePath);
      }
    }
  }
  if (!options.isPrefetchOnly) {
    return require.importAll(moduleID);
  }
  return undefined;
}
async function asyncRequire(moduleID, paths, moduleName) {
  return asyncRequireImpl(moduleID, paths, DEFAULT_OPTIONS);
}
asyncRequire.prefetch = function (moduleID, paths, moduleName) {
  asyncRequireImpl(moduleID, paths, {
    isPrefetchOnly: true,
  }).then(
    () => {},
    () => {}
  );
};
module.exports = asyncRequire;
