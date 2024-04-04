import { Container, UPDATE_COLOR, UPDATE_BLEND, UPDATE_VISIBLE } from '../Container.mjs';
import { mixColors } from './mixColors.mjs';

"use strict";
const tempContainer = new Container();
function updateRenderGroupTransforms(renderGroup, updateChildRenderGroups = false) {
  updateRenderGroupTransform(renderGroup);
  const childrenToUpdate = renderGroup.childrenToUpdate;
  const updateTick = renderGroup.updateTick;
  renderGroup.updateTick++;
  for (const j in childrenToUpdate) {
    const childrenAtDepth = childrenToUpdate[j];
    const list = childrenAtDepth.list;
    const index = childrenAtDepth.index;
    for (let i = 0; i < index; i++) {
      updateTransformAndChildren(list[i], updateTick, 0);
    }
    childrenAtDepth.index = 0;
  }
  if (updateChildRenderGroups) {
    for (let i = 0; i < renderGroup.renderGroupChildren.length; i++) {
      updateRenderGroupTransforms(renderGroup.renderGroupChildren[i], updateChildRenderGroups);
    }
  }
}
function updateRenderGroupTransform(renderGroup) {
  const root = renderGroup.root;
  let worldAlpha;
  if (renderGroup.renderGroupParent) {
    const renderGroupParent = renderGroup.renderGroupParent;
    renderGroup.worldTransform.appendFrom(
      root.relativeGroupTransform,
      renderGroupParent.worldTransform
    );
    renderGroup.worldColor = mixColors(
      root.groupColor,
      renderGroupParent.worldColor
    );
    worldAlpha = root.groupAlpha * renderGroupParent.worldAlpha;
  } else {
    renderGroup.worldTransform.copyFrom(root.localTransform);
    renderGroup.worldColor = root.localColor;
    worldAlpha = root.localAlpha;
  }
  worldAlpha = worldAlpha < 0 ? 0 : worldAlpha > 1 ? 1 : worldAlpha;
  renderGroup.worldAlpha = worldAlpha;
  renderGroup.worldColorAlpha = renderGroup.worldColor + ((worldAlpha * 255 | 0) << 24);
}
function updateTransformAndChildren(container, updateTick, updateFlags) {
  if (updateTick === container.updateTick)
    return;
  container.updateTick = updateTick;
  container.didChange = false;
  const localTransform = container.localTransform;
  container.updateLocalTransform();
  const parent = container.parent;
  if (parent && !parent.isRenderGroupRoot) {
    updateFlags = updateFlags | container._updateFlags;
    container.relativeGroupTransform.appendFrom(
      localTransform,
      parent.relativeGroupTransform
    );
    if (updateFlags) {
      updateColorBlendVisibility(container, parent, updateFlags);
    }
  } else {
    updateFlags = container._updateFlags;
    container.relativeGroupTransform.copyFrom(localTransform);
    if (updateFlags) {
      updateColorBlendVisibility(container, tempContainer, updateFlags);
    }
  }
  if (!container.isRenderGroupRoot) {
    const children = container.children;
    const length = children.length;
    for (let i = 0; i < length; i++) {
      updateTransformAndChildren(children[i], updateTick, updateFlags);
    }
    const renderGroup = container.renderGroup;
    if (container.renderPipeId && !renderGroup.structureDidChange) {
      renderGroup.updateRenderable(container);
    }
  }
}
function updateColorBlendVisibility(container, parent, updateFlags) {
  if (updateFlags & UPDATE_COLOR) {
    container.groupColor = mixColors(
      container.localColor,
      parent.groupColor
    );
    let groupAlpha = container.localAlpha * parent.groupAlpha;
    groupAlpha = groupAlpha < 0 ? 0 : groupAlpha > 1 ? 1 : groupAlpha;
    container.groupAlpha = groupAlpha;
    container.groupColorAlpha = container.groupColor + ((groupAlpha * 255 | 0) << 24);
  }
  if (updateFlags & UPDATE_BLEND) {
    container.groupBlendMode = container.localBlendMode === "inherit" ? parent.groupBlendMode : container.localBlendMode;
  }
  if (updateFlags & UPDATE_VISIBLE) {
    container.globalDisplayStatus = container.localDisplayStatus & parent.globalDisplayStatus;
  }
  container._updateFlags = 0;
}

export { updateRenderGroupTransform, updateRenderGroupTransforms, updateTransformAndChildren };
//# sourceMappingURL=updateRenderGroupTransforms.mjs.map
