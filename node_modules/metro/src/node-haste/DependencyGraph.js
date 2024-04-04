"use strict";

var _metroFileMap = require("metro-file-map");
const createFileMap = require("./DependencyGraph/createFileMap");
const { ModuleResolver } = require("./DependencyGraph/ModuleResolution");
const ModuleCache = require("./ModuleCache");
const { EventEmitter } = require("events");
const fs = require("fs");
const {
  AmbiguousModuleResolutionError,
  Logger: { createActionStartEntry, createActionEndEntry, log },
  PackageResolutionError,
} = require("metro-core");
const canonicalize = require("metro-core/src/canonicalize");
const { InvalidPackageError } = require("metro-resolver");
const nullthrows = require("nullthrows");
const path = require("path");
const NULL_PLATFORM = Symbol();
function getOrCreateMap(map, field) {
  let subMap = map.get(field);
  if (!subMap) {
    subMap = new Map();
    map.set(field, subMap);
  }
  return subMap;
}
class DependencyGraph extends EventEmitter {
  constructor(config, options) {
    super();
    this._config = config;
    const { hasReducedPerformance, watch } = options ?? {};
    const initializingMetroLogEntry = log(
      createActionStartEntry("Initializing Metro")
    );
    config.reporter.update({
      type: "dep_graph_loading",
      hasReducedPerformance: !!hasReducedPerformance,
    });
    const fileMap = createFileMap(config, {
      watch,
    });
    fileMap.setMaxListeners(1000);
    this._haste = fileMap;
    this._haste.on("status", (status) => this._onWatcherStatus(status));
    this._readyPromise = fileMap.build().then(({ fileSystem, hasteMap }) => {
      log(createActionEndEntry(initializingMetroLogEntry));
      config.reporter.update({
        type: "dep_graph_loaded",
      });
      this._fileSystem = fileSystem;
      this._hasteMap = hasteMap;
      this._haste.on("change", (changeEvent) =>
        this._onHasteChange(changeEvent)
      );
      this._haste.on("healthCheck", (result) =>
        this._onWatcherHealthCheck(result)
      );
      this._resolutionCache = new Map();
      this._moduleCache = this._createModuleCache();
      this._createModuleResolver();
    });
  }
  _onWatcherHealthCheck(result) {
    this._config.reporter.update({
      type: "watcher_health_check_result",
      result,
    });
  }
  _onWatcherStatus(status) {
    this._config.reporter.update({
      type: "watcher_status",
      status,
    });
  }
  async ready() {
    await this._readyPromise;
  }
  static async load(config, options) {
    const self = new DependencyGraph(config, options);
    await self.ready();
    return self;
  }
  _getClosestPackage(filePath) {
    const parsedPath = path.parse(filePath);
    const root = parsedPath.root;
    let dir = path.join(parsedPath.dir, parsedPath.base);
    do {
      if (path.basename(dir) === "node_modules") {
        return null;
      }
      const candidate = path.join(dir, "package.json");
      if (this._fileSystem.exists(candidate)) {
        return candidate;
      }
      dir = path.dirname(dir);
    } while (dir !== "." && dir !== root);
    return null;
  }
  _onHasteChange({ eventsQueue }) {
    this._resolutionCache = new Map();
    eventsQueue.forEach(({ filePath }) =>
      this._moduleCache.invalidate(filePath)
    );
    this._createModuleResolver();
    this.emit("change");
  }
  _createModuleResolver() {
    const getRealPathIfFile = (path) => {
      const result = this._fileSystem.lookup(path);
      return result.exists && result.type === "f" ? result.realPath : null;
    };
    this._moduleResolver = new ModuleResolver({
      assetExts: new Set(this._config.resolver.assetExts),
      dirExists: (filePath) => {
        try {
          return fs.lstatSync(filePath).isDirectory();
        } catch (e) {}
        return false;
      },
      disableHierarchicalLookup:
        this._config.resolver.disableHierarchicalLookup,
      doesFileExist: this._doesFileExist,
      emptyModulePath: this._config.resolver.emptyModulePath,
      extraNodeModules: this._config.resolver.extraNodeModules,
      getHasteModulePath: (name, platform) =>
        this._hasteMap.getModule(name, platform, true),
      getHastePackagePath: (name, platform) =>
        this._hasteMap.getPackage(name, platform, true),
      mainFields: this._config.resolver.resolverMainFields,
      moduleCache: this._moduleCache,
      nodeModulesPaths: this._config.resolver.nodeModulesPaths,
      preferNativePlatform: true,
      projectRoot: this._config.projectRoot,
      reporter: this._config.reporter,
      resolveAsset: (dirPath, assetName, extension) => {
        const basePath = dirPath + path.sep + assetName;
        let assets = [
          basePath + extension,
          ...this._config.resolver.assetResolutions.map(
            (resolution) => basePath + "@" + resolution + "x" + extension
          ),
        ];
        if (this._config.resolver.unstable_enableSymlinks) {
          assets = assets.map(getRealPathIfFile).filter(Boolean);
        } else {
          assets = assets.filter((candidate) =>
            this._fileSystem.exists(candidate)
          );
        }
        return assets.length ? assets : null;
      },
      resolveRequest: this._config.resolver.resolveRequest,
      sourceExts: this._config.resolver.sourceExts,
      unstable_conditionNames: this._config.resolver.unstable_conditionNames,
      unstable_conditionsByPlatform:
        this._config.resolver.unstable_conditionsByPlatform,
      unstable_enablePackageExports:
        this._config.resolver.unstable_enablePackageExports,
      unstable_getRealPath: this._config.resolver.unstable_enableSymlinks
        ? getRealPathIfFile
        : null,
    });
  }
  _createModuleCache() {
    return new ModuleCache({
      getClosestPackage: (filePath) => this._getClosestPackage(filePath),
    });
  }
  getAllFiles() {
    return nullthrows(this._fileSystem).getAllFiles();
  }
  getSha1(filename) {
    const resolvedPath = this._config.resolver.unstable_enableSymlinks
      ? filename
      : fs.realpathSync(filename);
    const sha1 = this._fileSystem.getSha1(resolvedPath);
    if (!sha1) {
      throw new ReferenceError(`SHA-1 for file ${filename} (${resolvedPath}) is not computed.
         Potential causes:
           1) You have symlinks in your project - watchman does not follow symlinks.
           2) Check \`blockList\` in your metro.config.js and make sure it isn't excluding the file path.`);
    }
    return sha1;
  }
  getWatcher() {
    return this._haste;
  }
  end() {
    this._haste.end();
  }
  matchFilesWithContext(from, context) {
    return this._fileSystem.matchFiles({
      rootDir: from,
      recursive: context.recursive,
      filter: context.filter,
      filterComparePosix: true,
      follow: true,
    });
  }
  resolveDependency(
    from,
    dependency,
    platform,
    resolverOptions,
    { assumeFlatNodeModules } = {
      assumeFlatNodeModules: false,
    }
  ) {
    const to = dependency.name;
    const isSensitiveToOriginFolder =
      !assumeFlatNodeModules ||
      to.includes("/") ||
      to === "." ||
      to === ".." ||
      from.includes(path.sep + "node_modules" + path.sep);
    const resolverOptionsKey =
      JSON.stringify(resolverOptions ?? {}, canonicalize) ?? "";
    const originKey = isSensitiveToOriginFolder ? path.dirname(from) : "";
    const targetKey = to;
    const platformKey = platform ?? NULL_PLATFORM;
    const mapByResolverOptions = this._resolutionCache;
    const mapByOrigin = getOrCreateMap(
      mapByResolverOptions,
      resolverOptionsKey
    );
    const mapByTarget = getOrCreateMap(mapByOrigin, originKey);
    const mapByPlatform = getOrCreateMap(mapByTarget, targetKey);
    let resolution = mapByPlatform.get(platformKey);
    if (!resolution) {
      try {
        resolution = this._moduleResolver.resolveDependency(
          this._moduleCache.getModule(from),
          dependency,
          true,
          platform,
          resolverOptions
        );
      } catch (error) {
        if (error instanceof _metroFileMap.DuplicateHasteCandidatesError) {
          throw new AmbiguousModuleResolutionError(from, error);
        }
        if (error instanceof InvalidPackageError) {
          throw new PackageResolutionError({
            packageError: error,
            originModulePath: from,
            targetModuleName: to,
          });
        }
        throw error;
      }
    }
    mapByPlatform.set(platformKey, resolution);
    return resolution;
  }
  _doesFileExist = (filePath) => {
    return this._fileSystem.exists(filePath);
  };
  getHasteName(filePath) {
    const hasteName = this._fileSystem.getModuleName(filePath);
    if (hasteName) {
      return hasteName;
    }
    return path.relative(this._config.projectRoot, filePath);
  }
  getDependencies(filePath) {
    return nullthrows(this._fileSystem.getDependencies(filePath));
  }
}
module.exports = DependencyGraph;
