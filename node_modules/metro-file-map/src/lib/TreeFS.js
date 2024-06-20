"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _constants = _interopRequireDefault(require("../constants"));
var _RootPathUtils = require("./RootPathUtils");
var _invariant = _interopRequireDefault(require("invariant"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class TreeFS {
  #cachedNormalSymlinkTargets = new WeakMap();
  #rootDir;
  #rootNode = new Map();
  #pathUtils;
  constructor({ rootDir, files }) {
    this.#rootDir = rootDir;
    this.#pathUtils = new _RootPathUtils.RootPathUtils(rootDir);
    if (files != null) {
      this.bulkAddOrModify(files);
    }
  }
  getSerializableSnapshot() {
    return this._cloneTree(this.#rootNode);
  }
  static fromDeserializedSnapshot({ rootDir, fileSystemData }) {
    const tfs = new TreeFS({
      rootDir,
    });
    tfs.#rootNode = fileSystemData;
    return tfs;
  }
  getModuleName(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    return (fileMetadata && fileMetadata[_constants.default.ID]) ?? null;
  }
  getSize(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    return (fileMetadata && fileMetadata[_constants.default.SIZE]) ?? null;
  }
  getDependencies(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    if (fileMetadata) {
      return fileMetadata[_constants.default.DEPENDENCIES]
        ? fileMetadata[_constants.default.DEPENDENCIES].split(
            _constants.default.DEPENDENCY_DELIM
          )
        : [];
    } else {
      return null;
    }
  }
  getDifference(files) {
    const changedFiles = new Map(files);
    const removedFiles = new Set();
    for (const { canonicalPath, metadata } of this.metadataIterator({
      includeSymlinks: true,
      includeNodeModules: true,
    })) {
      const newMetadata = files.get(canonicalPath);
      if (newMetadata) {
        if (
          (newMetadata[_constants.default.SYMLINK] === 0) !==
          (metadata[_constants.default.SYMLINK] === 0)
        ) {
          continue;
        }
        if (
          newMetadata[_constants.default.MTIME] != null &&
          newMetadata[_constants.default.MTIME] != 0 &&
          newMetadata[_constants.default.MTIME] ===
            metadata[_constants.default.MTIME]
        ) {
          changedFiles.delete(canonicalPath);
        } else if (
          newMetadata[_constants.default.SHA1] != null &&
          newMetadata[_constants.default.SHA1] ===
            metadata[_constants.default.SHA1] &&
          metadata[_constants.default.VISITED] === 1
        ) {
          const updatedMetadata = [...metadata];
          updatedMetadata[_constants.default.MTIME] =
            newMetadata[_constants.default.MTIME];
          changedFiles.set(canonicalPath, updatedMetadata);
        }
      } else {
        removedFiles.add(canonicalPath);
      }
    }
    return {
      changedFiles,
      removedFiles,
    };
  }
  getSha1(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    return (fileMetadata && fileMetadata[_constants.default.SHA1]) ?? null;
  }
  exists(mixedPath) {
    const result = this._getFileData(mixedPath);
    return result != null;
  }
  lookup(mixedPath) {
    const normalPath = this._normalizePath(mixedPath);
    const result = this._lookupByNormalPath(normalPath, {
      followLeaf: true,
    });
    if (!result.exists) {
      const { canonicalMissingPath, canonicalLinkPaths } = result;
      return {
        exists: false,
        links: new Set(
          canonicalLinkPaths.map((canonicalPath) =>
            this.#pathUtils.normalToAbsolute(canonicalPath)
          )
        ),
        missing: this.#pathUtils.normalToAbsolute(canonicalMissingPath),
      };
    }
    const { canonicalPath, canonicalLinkPaths, node } = result;
    const type =
      node instanceof Map
        ? "d"
        : node[_constants.default.SYMLINK] === 0
        ? "f"
        : "l";
    (0, _invariant.default)(
      type !== "l",
      "lookup follows symlinks, so should never return one (%s -> %s)",
      mixedPath,
      canonicalPath
    );
    return {
      exists: true,
      links: new Set(
        canonicalLinkPaths.map((canonicalPath) =>
          this.#pathUtils.normalToAbsolute(canonicalPath)
        )
      ),
      realPath: this.#pathUtils.normalToAbsolute(canonicalPath),
      type,
    };
  }
  getAllFiles() {
    return Array.from(
      this.metadataIterator({
        includeSymlinks: false,
        includeNodeModules: true,
      }),
      ({ canonicalPath }) => this.#pathUtils.normalToAbsolute(canonicalPath)
    );
  }
  linkStats(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath, {
      followLeaf: false,
    });
    if (fileMetadata == null) {
      return null;
    }
    const fileType = fileMetadata[_constants.default.SYMLINK] === 0 ? "f" : "l";
    const modifiedTime = fileMetadata[_constants.default.MTIME];
    return {
      fileType,
      modifiedTime,
    };
  }
  *matchFiles({
    filter = null,
    filterCompareAbsolute = false,
    filterComparePosix = false,
    follow = false,
    recursive = true,
    rootDir = null,
  }) {
    const normalRoot = rootDir == null ? "" : this._normalizePath(rootDir);
    const contextRootResult = this._lookupByNormalPath(normalRoot);
    if (!contextRootResult.exists) {
      return;
    }
    const { canonicalPath: rootRealPath, node: contextRoot } =
      contextRootResult;
    if (!(contextRoot instanceof Map)) {
      return;
    }
    const contextRootAbsolutePath =
      rootRealPath === ""
        ? this.#rootDir
        : _path.default.join(this.#rootDir, rootRealPath);
    const prefix = filterComparePosix ? "./" : "." + _path.default.sep;
    const contextRootAbsolutePathForComparison =
      filterComparePosix && _path.default.sep !== "/"
        ? contextRootAbsolutePath.replaceAll(_path.default.sep, "/")
        : contextRootAbsolutePath;
    for (const relativePathForComparison of this._pathIterator(contextRoot, {
      alwaysYieldPosix: filterComparePosix,
      canonicalPathOfRoot: rootRealPath,
      follow,
      recursive,
      subtreeOnly: rootDir != null,
    })) {
      if (
        filter == null ||
        filter.test(
          filterCompareAbsolute === true
            ? _path.default.join(
                contextRootAbsolutePathForComparison,
                relativePathForComparison
              )
            : prefix + relativePathForComparison
        )
      ) {
        const relativePath =
          filterComparePosix === true && _path.default.sep !== "/"
            ? relativePathForComparison.replaceAll("/", _path.default.sep)
            : relativePathForComparison;
        yield _path.default.join(contextRootAbsolutePath, relativePath);
      }
    }
  }
  addOrModify(mixedPath, metadata) {
    const normalPath = this._normalizePath(mixedPath);
    const parentDirNode = this._lookupByNormalPath(
      _path.default.dirname(normalPath),
      {
        makeDirectories: true,
      }
    );
    if (!parentDirNode.exists) {
      throw new Error(
        `TreeFS: Failed to make parent directory entry for ${mixedPath}`
      );
    }
    const canonicalPath = this._normalizePath(
      parentDirNode.canonicalPath +
        _path.default.sep +
        _path.default.basename(normalPath)
    );
    this.bulkAddOrModify(new Map([[canonicalPath, metadata]]));
  }
  bulkAddOrModify(addedOrModifiedFiles) {
    let lastDir;
    let directoryNode;
    for (const [normalPath, metadata] of addedOrModifiedFiles) {
      const lastSepIdx = normalPath.lastIndexOf(_path.default.sep);
      const dirname = lastSepIdx === -1 ? "" : normalPath.slice(0, lastSepIdx);
      const basename =
        lastSepIdx === -1 ? normalPath : normalPath.slice(lastSepIdx + 1);
      if (directoryNode == null || dirname !== lastDir) {
        const lookup = this._lookupByNormalPath(dirname, {
          followLeaf: false,
          makeDirectories: true,
        });
        if (!(lookup?.node instanceof Map)) {
          throw new Error(
            `TreeFS: Could not add directory ${dirname}, adding ${normalPath}. ` +
              `${dirname} already exists in the file map as a file.`
          );
        }
        lastDir = dirname;
        directoryNode = lookup.node;
      }
      directoryNode.set(basename, metadata);
    }
  }
  remove(mixedPath) {
    const normalPath = this._normalizePath(mixedPath);
    const result = this._lookupByNormalPath(normalPath, {
      followLeaf: false,
    });
    if (!result.exists) {
      return null;
    }
    const { parentNode, canonicalPath, node } = result;
    if (node instanceof Map && node.size > 0) {
      throw new Error(
        `TreeFS: remove called on a non-empty directory: ${mixedPath}`
      );
    }
    if (parentNode != null) {
      parentNode.delete(_path.default.basename(canonicalPath));
      if (parentNode.size === 0 && parentNode !== this.#rootNode) {
        this.remove(_path.default.dirname(canonicalPath));
      }
    }
    return node instanceof Map ? null : node;
  }
  _lookupByNormalPath(
    requestedNormalPath,
    opts = {
      followLeaf: true,
      makeDirectories: false,
    }
  ) {
    let targetNormalPath = requestedNormalPath;
    const canonicalLinkPaths = [];
    let seen;
    let fromIdx = 0;
    let parentNode = this.#rootNode;
    while (targetNormalPath.length > fromIdx) {
      const nextSepIdx = targetNormalPath.indexOf(_path.default.sep, fromIdx);
      const isLastSegment = nextSepIdx === -1;
      const segmentName = isLastSegment
        ? targetNormalPath.slice(fromIdx)
        : targetNormalPath.slice(fromIdx, nextSepIdx);
      fromIdx = !isLastSegment ? nextSepIdx + 1 : targetNormalPath.length;
      if (segmentName === ".") {
        continue;
      }
      let segmentNode = parentNode.get(segmentName);
      if (segmentNode == null) {
        if (opts.makeDirectories !== true && segmentName !== "..") {
          return {
            canonicalLinkPaths,
            canonicalMissingPath: isLastSegment
              ? targetNormalPath
              : targetNormalPath.slice(0, fromIdx - 1),
            exists: false,
          };
        }
        segmentNode = new Map();
        if (opts.makeDirectories === true) {
          parentNode.set(segmentName, segmentNode);
        }
      }
      if (
        isLastSegment &&
        (segmentNode instanceof Map ||
          segmentNode[_constants.default.SYMLINK] === 0 ||
          opts.followLeaf === false)
      ) {
        return {
          canonicalLinkPaths,
          canonicalPath: targetNormalPath,
          exists: true,
          node: segmentNode,
          parentNode,
        };
      }
      if (segmentNode instanceof Map) {
        parentNode = segmentNode;
      } else {
        const currentPath = isLastSegment
          ? targetNormalPath
          : targetNormalPath.slice(0, fromIdx - 1);
        if (segmentNode[_constants.default.SYMLINK] === 0) {
          return {
            canonicalLinkPaths,
            canonicalMissingPath: currentPath,
            exists: false,
          };
        }
        const normalSymlinkTarget = this._resolveSymlinkTargetToNormalPath(
          segmentNode,
          currentPath
        );
        canonicalLinkPaths.push(currentPath);
        targetNormalPath = isLastSegment
          ? normalSymlinkTarget
          : normalSymlinkTarget +
            _path.default.sep +
            targetNormalPath.slice(fromIdx);
        if (seen == null) {
          seen = new Set([requestedNormalPath]);
        }
        if (seen.has(targetNormalPath)) {
          return {
            canonicalLinkPaths,
            canonicalMissingPath: targetNormalPath,
            exists: false,
          };
        }
        seen.add(targetNormalPath);
        fromIdx = 0;
        parentNode = this.#rootNode;
      }
    }
    (0, _invariant.default)(
      parentNode === this.#rootNode,
      "Unexpectedly escaped traversal"
    );
    return {
      canonicalLinkPaths,
      canonicalPath: targetNormalPath,
      exists: true,
      node: this.#rootNode,
      parentNode: null,
    };
  }
  *metadataIterator(opts) {
    yield* this._metadataIterator(this.#rootNode, opts);
  }
  *_metadataIterator(rootNode, opts, prefix = "") {
    for (const [name, node] of rootNode) {
      if (
        !opts.includeNodeModules &&
        node instanceof Map &&
        name === "node_modules"
      ) {
        continue;
      }
      const prefixedName =
        prefix === "" ? name : prefix + _path.default.sep + name;
      if (node instanceof Map) {
        yield* this._metadataIterator(node, opts, prefixedName);
      } else if (
        node[_constants.default.SYMLINK] === 0 ||
        opts.includeSymlinks
      ) {
        yield {
          canonicalPath: prefixedName,
          metadata: node,
          baseName: name,
        };
      }
    }
  }
  _normalizePath(relativeOrAbsolutePath) {
    return _path.default.isAbsolute(relativeOrAbsolutePath)
      ? this.#pathUtils.absoluteToNormal(relativeOrAbsolutePath)
      : this.#pathUtils.relativeToNormal(relativeOrAbsolutePath);
  }
  *_pathIterator(rootNode, opts, pathPrefix = "", followedLinks = new Set()) {
    const pathSep = opts.alwaysYieldPosix ? "/" : _path.default.sep;
    const prefixWithSep = pathPrefix === "" ? pathPrefix : pathPrefix + pathSep;
    for (const [name, node] of rootNode ?? this.#rootNode) {
      if (opts.subtreeOnly && name === "..") {
        continue;
      }
      const nodePath = prefixWithSep + name;
      if (!(node instanceof Map)) {
        if (node[_constants.default.SYMLINK] === 0) {
          yield nodePath;
        } else {
          const nodePathWithSystemSeparators =
            pathSep === _path.default.sep
              ? nodePath
              : nodePath.replaceAll(pathSep, _path.default.sep);
          const normalPathOfSymlink = _path.default.join(
            opts.canonicalPathOfRoot,
            nodePathWithSystemSeparators
          );
          const resolved = this._lookupByNormalPath(normalPathOfSymlink, {
            followLeaf: true,
          });
          if (!resolved.exists) {
            continue;
          }
          const target = resolved.node;
          if (!(target instanceof Map)) {
            yield nodePath;
          } else if (
            opts.recursive &&
            opts.follow &&
            !followedLinks.has(node)
          ) {
            yield* this._pathIterator(
              target,
              opts,
              nodePath,
              new Set([...followedLinks, node])
            );
          }
        }
      } else if (opts.recursive) {
        yield* this._pathIterator(node, opts, nodePath, followedLinks);
      }
    }
  }
  _resolveSymlinkTargetToNormalPath(symlinkNode, canonicalPathOfSymlink) {
    let normalSymlinkTarget = this.#cachedNormalSymlinkTargets.get(symlinkNode);
    if (normalSymlinkTarget != null) {
      return normalSymlinkTarget;
    }
    const literalSymlinkTarget = symlinkNode[_constants.default.SYMLINK];
    (0, _invariant.default)(
      typeof literalSymlinkTarget === "string",
      "Expected symlink target to be populated."
    );
    const absoluteSymlinkTarget = _path.default.resolve(
      this.#rootDir,
      canonicalPathOfSymlink,
      "..",
      literalSymlinkTarget
    );
    normalSymlinkTarget = _path.default.relative(
      this.#rootDir,
      absoluteSymlinkTarget
    );
    this.#cachedNormalSymlinkTargets.set(symlinkNode, normalSymlinkTarget);
    return normalSymlinkTarget;
  }
  _getFileData(
    filePath,
    opts = {
      followLeaf: true,
    }
  ) {
    const normalPath = this._normalizePath(filePath);
    const result = this._lookupByNormalPath(normalPath, {
      followLeaf: opts.followLeaf,
    });
    if (!result.exists || result.node instanceof Map) {
      return null;
    }
    return result.node;
  }
  _cloneTree(root) {
    const clone = new Map();
    for (const [name, node] of root) {
      if (node instanceof Map) {
        clone.set(name, this._cloneTree(node));
      } else {
        clone.set(name, [...node]);
      }
    }
    return clone;
  }
}
exports.default = TreeFS;
