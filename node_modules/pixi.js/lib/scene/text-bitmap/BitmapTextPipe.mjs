import { Cache } from '../../assets/cache/Cache.mjs';
import { ExtensionType } from '../../extensions/Extensions.mjs';
import { BigPool } from '../../utils/pool/PoolGroup.mjs';
import { Graphics } from '../graphics/shared/Graphics.mjs';
import { SdfShader } from '../text/sdfShader/SdfShader.mjs';
import { BitmapFontManager } from './BitmapFontManager.mjs';
import { getBitmapTextLayout } from './utils/getBitmapTextLayout.mjs';

"use strict";
class BitmapTextPipe {
  constructor(renderer) {
    this._gpuBitmapText = {};
    this._renderer = renderer;
  }
  validateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    return this._renderer.renderPipes.graphics.validateRenderable(graphicsRenderable);
  }
  addRenderable(bitmapText, instructionSet) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    this._renderer.renderPipes.graphics.addRenderable(graphicsRenderable, instructionSet);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  destroyRenderable(bitmapText) {
    this._destroyRenderableByUid(bitmapText.uid);
  }
  _destroyRenderableByUid(renderableUid) {
    BigPool.return(this._gpuBitmapText[renderableUid]);
    this._gpuBitmapText[renderableUid] = null;
  }
  updateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    this._renderer.renderPipes.graphics.updateRenderable(graphicsRenderable);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  _updateContext(bitmapText, proxyGraphics) {
    const { context } = proxyGraphics;
    const bitmapFont = BitmapFontManager.getFont(bitmapText.text, bitmapText._style);
    context.clear();
    if (bitmapFont.distanceField.type !== "none") {
      if (!context.customShader) {
        if (!this._sdfShader) {
          this._sdfShader = new SdfShader();
        }
        context.customShader = this._sdfShader;
      }
    }
    const chars = Array.from(bitmapText.text);
    const style = bitmapText._style;
    let currentY = (style._stroke?.width || 0) / 2;
    currentY += bitmapFont.baseLineOffset;
    const bitmapTextLayout = getBitmapTextLayout(chars, style, bitmapFont);
    let index = 0;
    const padding = style.padding;
    const scale = bitmapTextLayout.scale;
    context.translate(
      -bitmapText._anchor._x * bitmapTextLayout.width - padding,
      -bitmapText._anchor._y * (bitmapTextLayout.height + bitmapTextLayout.offsetY) - padding
    ).scale(scale, scale);
    const tint = style._fill.color;
    for (let i = 0; i < bitmapTextLayout.lines.length; i++) {
      const line = bitmapTextLayout.lines[i];
      for (let j = 0; j < line.charPositions.length; j++) {
        const char = chars[index++];
        const charData = bitmapFont.chars[char];
        if (charData?.texture) {
          context.texture(
            charData.texture,
            tint ? tint : "black",
            Math.round(line.charPositions[j] + charData.xOffset),
            Math.round(currentY + charData.yOffset)
          );
        }
      }
      currentY += bitmapFont.lineHeight;
    }
  }
  _getGpuBitmapText(bitmapText) {
    return this._gpuBitmapText[bitmapText.uid] || this.initGpuText(bitmapText);
  }
  initGpuText(bitmapText) {
    const proxyRenderable = BigPool.get(Graphics);
    this._gpuBitmapText[bitmapText.uid] = proxyRenderable;
    this._updateContext(bitmapText, proxyRenderable);
    bitmapText.on("destroyed", () => {
      this.destroyRenderable(bitmapText);
    });
    return this._gpuBitmapText[bitmapText.uid];
  }
  _updateDistanceField(bitmapText) {
    const context = this._getGpuBitmapText(bitmapText).context;
    const fontFamily = bitmapText._style.fontFamily;
    const dynamicFont = Cache.get(`${fontFamily}-bitmap`);
    const { a, b, c, d } = bitmapText.groupTransform;
    const dx = Math.sqrt(a * a + b * b);
    const dy = Math.sqrt(c * c + d * d);
    const worldScale = (Math.abs(dx) + Math.abs(dy)) / 2;
    const fontScale = dynamicFont.baseRenderedFontSize / bitmapText._style.fontSize;
    const resolution = bitmapText.resolution ?? this._renderer.resolution;
    const distance = worldScale * dynamicFont.distanceField.range * (1 / fontScale) * resolution;
    context.customShader.resources.localUniforms.uniforms.uDistance = distance;
  }
  destroy() {
    for (const uid in this._gpuBitmapText) {
      this._destroyRenderableByUid(uid);
    }
    this._gpuBitmapText = null;
    this._sdfShader?.destroy(true);
    this._sdfShader = null;
    this._renderer = null;
  }
}
/** @ignore */
BitmapTextPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "bitmapText"
};
function syncWithProxy(container, proxy) {
  proxy.groupTransform = container.groupTransform;
  proxy.groupColorAlpha = container.groupColorAlpha;
  proxy.groupColor = container.groupColor;
  proxy.groupBlendMode = container.groupBlendMode;
  proxy.globalDisplayStatus = container.globalDisplayStatus;
  proxy.groupTransform = container.groupTransform;
  proxy.localDisplayStatus = container.localDisplayStatus;
  proxy.groupAlpha = container.groupAlpha;
  proxy._roundPixels = container._roundPixels;
}

export { BitmapTextPipe };
//# sourceMappingURL=BitmapTextPipe.mjs.map
