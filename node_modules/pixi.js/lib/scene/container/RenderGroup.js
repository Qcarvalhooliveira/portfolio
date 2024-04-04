'use strict';

var Matrix = require('../../maths/matrix/Matrix.js');
var InstructionSet = require('../../rendering/renderers/shared/instructions/InstructionSet.js');

"use strict";
class RenderGroup {
  constructor(root) {
    this.renderPipeId = "renderGroup";
    this.root = null;
    this.canBundle = false;
    this.renderGroupParent = null;
    this.renderGroupChildren = [];
    this._children = [];
    this.worldTransform = new Matrix.Matrix();
    this.worldColorAlpha = 4294967295;
    this.worldColor = 16777215;
    this.worldAlpha = 1;
    // these updates are transform changes..
    this.childrenToUpdate = /* @__PURE__ */ Object.create(null);
    this.updateTick = 0;
    // these update are renderable changes..
    this.childrenRenderablesToUpdate = { list: [], index: 0 };
    // other
    this.structureDidChange = true;
    this.instructionSet = new InstructionSet.InstructionSet();
    this._onRenderContainers = [];
    this.root = root;
    this.addChild(root);
  }
  get localTransform() {
    return this.root.localTransform;
  }
  addRenderGroupChild(renderGroupChild) {
    if (renderGroupChild.renderGroupParent) {
      renderGroupChild.renderGroupParent._removeRenderGroupChild(renderGroupChild);
    }
    renderGroupChild.renderGroupParent = this;
    this.onChildUpdate(renderGroupChild.root);
    this.renderGroupChildren.push(renderGroupChild);
  }
  _removeRenderGroupChild(renderGroupChild) {
    if (renderGroupChild.root.didChange) {
      this._removeChildFromUpdate(renderGroupChild.root);
    }
    const index = this.renderGroupChildren.indexOf(renderGroupChild);
    if (index > -1) {
      this.renderGroupChildren.splice(index, 1);
    }
    renderGroupChild.renderGroupParent = null;
  }
  addChild(child) {
    this.structureDidChange = true;
    if (child !== this.root) {
      this._children.push(child);
      child.updateTick = -1;
      if (child.parent === this.root) {
        child.relativeRenderGroupDepth = 1;
      } else {
        child.relativeRenderGroupDepth = child.parent.relativeRenderGroupDepth + 1;
      }
      if (child._onRender) {
        this.addOnRender(child);
      }
    }
    if (child.renderGroup) {
      if (child.renderGroup.root === child) {
        this.addRenderGroupChild(child.renderGroup);
        return;
      }
    } else {
      child.renderGroup = this;
      child.didChange = true;
    }
    const children = child.children;
    if (!child.isRenderGroupRoot) {
      this.onChildUpdate(child);
    }
    for (let i = 0; i < children.length; i++) {
      this.addChild(children[i]);
    }
  }
  removeChild(child) {
    this.structureDidChange = true;
    if (child._onRender) {
      this.removeOnRender(child);
    }
    if (child.renderGroup.root !== child) {
      const children = child.children;
      for (let i = 0; i < children.length; i++) {
        this.removeChild(children[i]);
      }
      if (child.didChange) {
        child.renderGroup._removeChildFromUpdate(child);
      }
      child.renderGroup = null;
    } else {
      this._removeRenderGroupChild(child.renderGroup);
    }
    const index = this._children.indexOf(child);
    if (index > -1) {
      this._children.splice(index, 1);
    }
  }
  onChildUpdate(child) {
    let childrenToUpdate = this.childrenToUpdate[child.relativeRenderGroupDepth];
    if (!childrenToUpdate) {
      childrenToUpdate = this.childrenToUpdate[child.relativeRenderGroupDepth] = {
        index: 0,
        list: []
      };
    }
    childrenToUpdate.list[childrenToUpdate.index++] = child;
  }
  // SHOULD THIS BE HERE?
  updateRenderable(container) {
    if (container.globalDisplayStatus < 7)
      return;
    container.didViewUpdate = false;
    this.instructionSet.renderPipes[container.renderPipeId].updateRenderable(container);
  }
  onChildViewUpdate(child) {
    this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++] = child;
  }
  _removeChildFromUpdate(child) {
    const childrenToUpdate = this.childrenToUpdate[child.relativeRenderGroupDepth];
    if (!childrenToUpdate) {
      return;
    }
    const index = childrenToUpdate.list.indexOf(child);
    if (index > -1) {
      childrenToUpdate.list.splice(index, 1);
    }
    childrenToUpdate.index--;
  }
  get isRenderable() {
    return this.root.localDisplayStatus === 7 && this.worldAlpha > 0;
  }
  /**
   * adding a container to the onRender list will make sure the user function
   * passed in to the user defined 'onRender` callBack
   * @param container - the container to add to the onRender list
   */
  addOnRender(container) {
    this._onRenderContainers.push(container);
  }
  removeOnRender(container) {
    this._onRenderContainers.splice(this._onRenderContainers.indexOf(container), 1);
  }
  runOnRender() {
    for (let i = 0; i < this._onRenderContainers.length; i++) {
      this._onRenderContainers[i]._onRender();
    }
  }
}

exports.RenderGroup = RenderGroup;
//# sourceMappingURL=RenderGroup.js.map
