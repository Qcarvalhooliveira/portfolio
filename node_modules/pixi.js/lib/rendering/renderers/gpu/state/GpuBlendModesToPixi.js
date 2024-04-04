'use strict';

"use strict";
const GpuBlendModesToPixi = {};
GpuBlendModesToPixi.normal = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  }
};
GpuBlendModesToPixi.add = {
  alpha: {
    srcFactor: "src-alpha",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "one",
    dstFactor: "one",
    operation: "add"
  }
};
GpuBlendModesToPixi.multiply = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "dst",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  }
};
GpuBlendModesToPixi.screen = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "one",
    dstFactor: "one-minus-src",
    operation: "add"
  }
};
GpuBlendModesToPixi.overlay = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "one",
    dstFactor: "one-minus-src",
    operation: "add"
  }
};
GpuBlendModesToPixi.none = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "zero",
    dstFactor: "zero",
    operation: "add"
  }
};
GpuBlendModesToPixi["normal-npm"] = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "src-alpha",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  }
};
GpuBlendModesToPixi["add-npm"] = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one",
    operation: "add"
  },
  color: {
    srcFactor: "src-alpha",
    dstFactor: "one",
    operation: "add"
  }
};
GpuBlendModesToPixi["screen-npm"] = {
  alpha: {
    srcFactor: "one",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "src-alpha",
    dstFactor: "one-minus-src",
    operation: "add"
  }
};
GpuBlendModesToPixi.erase = {
  alpha: {
    srcFactor: "zero",
    dstFactor: "one-minus-src-alpha",
    operation: "add"
  },
  color: {
    srcFactor: "zero",
    dstFactor: "one-minus-src",
    operation: "add"
  }
};

exports.GpuBlendModesToPixi = GpuBlendModesToPixi;
//# sourceMappingURL=GpuBlendModesToPixi.js.map
