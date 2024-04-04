"use strict";
function mapWebGLBlendModesToPixi(gl) {
  const blendMap = {};
  blendMap.normal = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  blendMap.add = [gl.ONE, gl.ONE];
  blendMap.multiply = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  blendMap.screen = [gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  blendMap.none = [0, 0];
  blendMap["normal-npm"] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  blendMap["add-npm"] = [gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE];
  blendMap["screen-npm"] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  blendMap.erase = [gl.ZERO, gl.ONE_MINUS_SRC_ALPHA];
  return blendMap;
}

export { mapWebGLBlendModesToPixi };
//# sourceMappingURL=mapWebGLBlendModesToPixi.mjs.map
