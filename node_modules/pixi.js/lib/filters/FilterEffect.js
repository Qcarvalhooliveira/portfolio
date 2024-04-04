'use strict';

"use strict";
class FilterEffect {
  constructor(options) {
    this.pipe = "filter";
    this.priority = 1;
    this.filters = options?.filters;
    this.filterArea = options?.filterArea;
  }
  destroy() {
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i].destroy();
    }
    this.filters = null;
    this.filterArea = null;
  }
}

exports.FilterEffect = FilterEffect;
//# sourceMappingURL=FilterEffect.js.map
