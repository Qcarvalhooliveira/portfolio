'use strict';

var ObservablePoint = require('../../maths/point/ObservablePoint.js');
var Texture = require('../../rendering/renderers/shared/texture/Texture.js');
var updateQuadBounds = require('../../utils/data/updateQuadBounds.js');
var Container = require('../container/Container.js');

"use strict";
class Sprite extends Container.Container {
  /**
   * @param options - The options for creating the sprite.
   */
  constructor(options = Texture.Texture.EMPTY) {
    if (options instanceof Texture.Texture) {
      options = { texture: options };
    }
    const { texture, anchor, roundPixels, width, height, ...rest } = options;
    super({
      label: "Sprite",
      ...rest
    });
    this.renderPipeId = "sprite";
    this.batched = true;
    this._didSpriteUpdate = false;
    this._bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    this._sourceBounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    this._boundsDirty = true;
    this._sourceBoundsDirty = true;
    this._roundPixels = 0;
    this._anchor = new ObservablePoint.ObservablePoint(
      {
        _onUpdate: () => {
          this.onViewUpdate();
        }
      }
    );
    if (anchor)
      this.anchor = anchor;
    this.texture = texture;
    this.allowChildren = false;
    this.roundPixels = roundPixels ?? false;
    if (width)
      this.width = width;
    if (height)
      this.height = height;
  }
  /**
   * Helper function that creates a new sprite based on the source you provide.
   * The source can be - frame id, image, video, canvas element, video element, texture
   * @param source - Source to create texture from
   * @param [skipCache] - Whether to skip the cache or not
   * @returns The newly created sprite
   */
  static from(source, skipCache = false) {
    if (source instanceof Texture.Texture) {
      return new Sprite(source);
    }
    return new Sprite(Texture.Texture.from(source, skipCache));
  }
  set texture(value) {
    value || (value = Texture.Texture.EMPTY);
    if (this._texture === value)
      return;
    this._texture = value;
    this.onViewUpdate();
  }
  /** The texture that the sprite is using. */
  get texture() {
    return this._texture;
  }
  /**
   * The local bounds of the sprite.
   * @type {rendering.Bounds}
   */
  get bounds() {
    if (this._boundsDirty) {
      this._updateBounds();
      this._boundsDirty = false;
    }
    return this._bounds;
  }
  /**
   * The bounds of the sprite, taking the texture's trim into account.
   * @type {rendering.Bounds}
   */
  get sourceBounds() {
    if (this._sourceBoundsDirty) {
      this._updateSourceBounds();
      this._sourceBoundsDirty = false;
    }
    return this._sourceBounds;
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(point) {
    const bounds = this.sourceBounds;
    if (point.x >= bounds.maxX && point.x <= bounds.minX) {
      if (point.y >= bounds.maxY && point.y <= bounds.minY) {
        return true;
      }
    }
    return false;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(bounds) {
    const _bounds = this._texture.trim ? this.sourceBounds : this.bounds;
    bounds.addFrame(_bounds.minX, _bounds.minY, _bounds.maxX, _bounds.maxY);
  }
  onViewUpdate() {
    this._didChangeId += 1 << 12;
    this._didSpriteUpdate = true;
    this._sourceBoundsDirty = this._boundsDirty = true;
    if (this.didViewUpdate)
      return;
    this.didViewUpdate = true;
    if (this.renderGroup) {
      this.renderGroup.onChildViewUpdate(this);
    }
  }
  _updateBounds() {
    updateQuadBounds.updateQuadBounds(this._bounds, this._anchor, this._texture, 0);
  }
  _updateSourceBounds() {
    const anchor = this._anchor;
    const texture = this._texture;
    const sourceBounds = this._sourceBounds;
    const { width, height } = texture.orig;
    sourceBounds.maxX = -anchor._x * width;
    sourceBounds.minX = sourceBounds.maxX + width;
    sourceBounds.maxY = -anchor._y * height;
    sourceBounds.minY = sourceBounds.maxY + height;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(options = false) {
    super.destroy(options);
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      this._texture.destroy(destroyTextureSource);
    }
    this._texture = null;
    this._bounds = null;
    this._sourceBounds = null;
    this._anchor = null;
  }
  /**
   * The anchor sets the origin point of the sprite. The default value is taken from the {@link Texture}
   * and passed to the constructor.
   *
   * The default is `(0,0)`, this means the sprite's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite({texture: Texture.WHITE});
   * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(value) {
    typeof value === "number" ? this._anchor.set(value) : this._anchor.copyFrom(value);
  }
  /**
   *  Whether or not to round the x/y position of the sprite.
   * @type {boolean}
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(value) {
    this._roundPixels = value ? 1 : 0;
  }
  /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(value) {
    this._setWidth(value, this._texture.orig.width);
  }
  /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(value) {
    this._setHeight(value, this._texture.orig.height);
  }
  /**
   * Retrieves the size of the Sprite as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the Sprite.
   */
  getSize(out) {
    if (!out) {
      out = {};
    }
    out.width = Math.abs(this.scale.x) * this._texture.orig.width;
    out.height = Math.abs(this.scale.y) * this._texture.orig.height;
    return out;
  }
  /**
   * Sets the size of the Sprite to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   */
  setSize(value, height) {
    let convertedWidth;
    let convertedHeight;
    if (typeof value !== "object") {
      convertedWidth = value;
      convertedHeight = height ?? value;
    } else {
      convertedWidth = value.width;
      convertedHeight = value.height ?? value.width;
    }
    if (convertedWidth !== void 0) {
      this._setWidth(convertedWidth, this._texture.orig.width);
    }
    if (convertedHeight !== void 0) {
      this._setHeight(convertedHeight, this._texture.orig.height);
    }
  }
}

exports.Sprite = Sprite;
//# sourceMappingURL=Sprite.js.map
