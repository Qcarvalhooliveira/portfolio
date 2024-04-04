"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.RootPathUtils = void 0;
var path = _interopRequireWildcard(require("path"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
const UP_FRAGMENT = ".." + path.sep;
const UP_FRAGMENT_LENGTH = UP_FRAGMENT.length;
const CURRENT_FRAGMENT = "." + path.sep;
class RootPathUtils {
  #rootDir;
  #rootDirnames;
  #rootParts;
  #rootDepth;
  constructor(rootDir) {
    this.#rootDir = rootDir;
    const rootDirnames = [];
    for (
      let next = rootDir, previous = null;
      previous !== next;
      previous = next, next = path.dirname(next)
    ) {
      rootDirnames.push(next);
    }
    this.#rootDirnames = rootDirnames;
    this.#rootParts = rootDir.split(path.sep);
    this.#rootDepth = rootDirnames.length - 1;
    if (this.#rootDepth === 0) {
      this.#rootParts.pop();
    }
  }
  absoluteToNormal(absolutePath) {
    let endOfMatchingPrefix = 0;
    let lastMatchingPartIdx = 0;
    for (
      let nextPart = this.#rootParts[0], nextLength = nextPart.length;
      nextPart != null &&
      absolutePath.startsWith(nextPart, endOfMatchingPrefix) &&
      (absolutePath.length === endOfMatchingPrefix + nextLength ||
        absolutePath[endOfMatchingPrefix + nextLength] === path.sep);

    ) {
      endOfMatchingPrefix += nextLength + 1;
      nextPart = this.#rootParts[++lastMatchingPartIdx];
      nextLength = nextPart?.length;
    }
    const upIndirectionsToPrepend =
      this.#rootParts.length - lastMatchingPartIdx;
    return (
      this.#tryCollapseIndirectionsInSuffix(
        absolutePath,
        endOfMatchingPrefix,
        upIndirectionsToPrepend
      ) ?? path.relative(this.#rootDir, absolutePath)
    );
  }
  normalToAbsolute(normalPath) {
    let left = this.#rootDir;
    let i = 0;
    let pos = 0;
    while (
      normalPath.startsWith(UP_FRAGMENT, pos) ||
      (normalPath.endsWith("..") && normalPath.length === 2 + pos)
    ) {
      left = this.#rootDirnames[i === this.#rootDepth ? this.#rootDepth : ++i];
      pos += UP_FRAGMENT_LENGTH;
    }
    const right = pos === 0 ? normalPath : normalPath.slice(pos);
    if (right.length === 0) {
      return left;
    }
    if (i === this.#rootDepth) {
      return left + right;
    }
    return left + path.sep + right;
  }
  relativeToNormal(relativePath) {
    return (
      this.#tryCollapseIndirectionsInSuffix(relativePath, 0, 0) ??
      path.relative(this.#rootDir, path.join(this.#rootDir, relativePath))
    );
  }
  #tryCollapseIndirectionsInSuffix(
    fullPath,
    startOfRelativePart,
    implicitUpIndirections
  ) {
    let totalUpIndirections = implicitUpIndirections;
    for (let pos = startOfRelativePart; ; pos += UP_FRAGMENT_LENGTH) {
      const nextIndirection = fullPath.indexOf(CURRENT_FRAGMENT, pos);
      if (nextIndirection === -1) {
        while (totalUpIndirections > 0) {
          const segmentToMaybeCollapse =
            this.#rootParts[this.#rootParts.length - totalUpIndirections];
          if (
            fullPath.startsWith(segmentToMaybeCollapse, pos) &&
            (fullPath.length === segmentToMaybeCollapse.length + pos ||
              fullPath[segmentToMaybeCollapse.length + pos] === path.sep)
          ) {
            pos += segmentToMaybeCollapse.length + 1;
            totalUpIndirections--;
          } else {
            break;
          }
        }
        const right = fullPath.slice(pos);
        if (
          right === "" ||
          (right === ".." && totalUpIndirections >= this.#rootParts.length - 1)
        ) {
          return UP_FRAGMENT.repeat(totalUpIndirections).slice(0, -1);
        }
        if (totalUpIndirections === 0) {
          return right;
        }
        return UP_FRAGMENT.repeat(totalUpIndirections) + right;
      }
      if (totalUpIndirections < this.#rootParts.length - 1) {
        totalUpIndirections++;
      }
      if (nextIndirection !== pos + 1 || fullPath[pos] !== ".") {
        return null;
      }
    }
  }
}
exports.RootPathUtils = RootPathUtils;
