"use strict";
function buildInstructions(renderGroup, renderPipes) {
  const root = renderGroup.root;
  const instructionSet = renderGroup.instructionSet;
  instructionSet.reset();
  renderPipes.batch.buildStart(instructionSet);
  renderPipes.blendMode.buildStart();
  renderPipes.colorMask.buildStart();
  if (root.sortableChildren) {
    root.sortChildren();
  }
  collectAllRenderablesAdvanced(root, instructionSet, renderPipes, true);
  renderPipes.batch.buildEnd(instructionSet);
  renderPipes.blendMode.buildEnd(instructionSet);
}
function collectAllRenderables(container, instructionSet, rendererPipes) {
  if (container.globalDisplayStatus < 7 || !container.includeInBuild)
    return;
  if (container.sortableChildren) {
    container.sortChildren();
  }
  if (container.isSimple) {
    collectAllRenderablesSimple(container, instructionSet, rendererPipes);
  } else {
    collectAllRenderablesAdvanced(container, instructionSet, rendererPipes, false);
  }
}
function collectAllRenderablesSimple(container, instructionSet, renderPipes) {
  if (container.renderPipeId) {
    renderPipes.blendMode.setBlendMode(container, container.groupBlendMode, instructionSet);
    container.didViewUpdate = false;
    const rp = renderPipes;
    rp[container.renderPipeId].addRenderable(container, instructionSet);
  }
  if (!container.isRenderGroupRoot) {
    const children = container.children;
    const length = children.length;
    for (let i = 0; i < length; i++) {
      collectAllRenderables(children[i], instructionSet, renderPipes);
    }
  }
}
function collectAllRenderablesAdvanced(container, instructionSet, renderPipes, isRoot) {
  if (!isRoot && container.isRenderGroupRoot) {
    renderPipes.renderGroup.addRenderGroup(container.renderGroup, instructionSet);
  } else {
    for (let i = 0; i < container.effects.length; i++) {
      const effect = container.effects[i];
      const pipe = renderPipes[effect.pipe];
      pipe.push(effect, container, instructionSet);
    }
    const renderPipeId = container.renderPipeId;
    if (renderPipeId) {
      renderPipes.blendMode.setBlendMode(container, container.groupBlendMode, instructionSet);
      container.didViewUpdate = false;
      const pipe = renderPipes[renderPipeId];
      pipe.addRenderable(container, instructionSet);
    }
    const children = container.children;
    if (children.length) {
      for (let i = 0; i < children.length; i++) {
        collectAllRenderables(children[i], instructionSet, renderPipes);
      }
    }
    for (let i = container.effects.length - 1; i >= 0; i--) {
      const effect = container.effects[i];
      const pipe = renderPipes[effect.pipe];
      pipe.pop(effect, container, instructionSet);
    }
  }
}

export { buildInstructions, collectAllRenderables };
//# sourceMappingURL=buildInstructions.mjs.map
