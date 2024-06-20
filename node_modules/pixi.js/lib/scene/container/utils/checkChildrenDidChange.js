'use strict';

"use strict";
function checkChildrenDidChange(container, previousData) {
  const children = container.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const changeId = (child.uid & 255) << 24 | child._didChangeId & 16777215;
    if (previousData.data[previousData.index] !== changeId) {
      previousData.data[previousData.index] = changeId;
      previousData.didChange = true;
    }
    previousData.index++;
    if (child.children.length) {
      checkChildrenDidChange(child, previousData);
    }
  }
  return previousData.didChange;
}

exports.checkChildrenDidChange = checkChildrenDidChange;
//# sourceMappingURL=checkChildrenDidChange.js.map
