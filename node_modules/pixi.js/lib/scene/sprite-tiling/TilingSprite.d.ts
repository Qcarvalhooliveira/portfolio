import { ObservablePoint } from '../../maths/point/ObservablePoint';
import { Texture } from '../../rendering/renderers/shared/texture/Texture';
import { Transform } from '../../utils/misc/Transform';
import { Container } from '../container/Container';
import type { PointData } from '../../maths/point/PointData';
import type { Instruction } from '../../rendering/renderers/shared/instructions/Instruction';
import type { View } from '../../rendering/renderers/shared/view/View';
import type { Bounds, BoundsData } from '../container/bounds/Bounds';
import type { ContainerOptions } from '../container/Container';
import type { DestroyOptions } from '../container/destroyTypes';
/**
 * Constructor options used for `TilingSprite` instances. Extends {@link scene.TilingSpriteViewOptions}
 * ```js
 * const tilingSprite = new TilingSprite({
 *    texture: Texture.from('assets/image.png'),
 *    width: 100,
 *    height: 100,
 *    tilePosition: { x: 100, y: 100 },
 *    tileScale: { x: 2, y: 2 },
 * });
 * ```
 * @see {@link scene.TilingSprite}
 * @see {@link scene.TilingSpriteViewOptions}
 * @memberof scene
 */
export interface TilingSpriteOptions extends ContainerOptions {
    /**
     * The anchor point of the sprite
     * @default {x: 0, y: 0}
     */
    anchor?: PointData;
    /**
     * The offset of the image that is being tiled.
     * @default {x: 0, y: 0}
     */
    tilePosition?: PointData;
    /**
     * Scaling of the image that is being tiled.
     * @default {x: 1, y: 1}
     */
    tileScale?: PointData;
    /**
     * The rotation of the image that is being tiled.
     * @default 0
     */
    tileRotation?: number;
    /**
     * The texture to use for the sprite.
     * @default Texture.WHITE
     */
    texture?: Texture;
    /**
     * The width of the tiling sprite. #
     * @default 256
     */
    width?: number;
    /**
     * The height of the tiling sprite.
     * @default 256
     */
    height?: number;
    /**
     * @todo
     * @default false
     */
    applyAnchorToTexture?: boolean;
    /** Whether or not to round the x/y position. */
    roundPixels?: boolean;
}
/**
 * A tiling sprite is a fast way of rendering a tiling image.
 * @example
 * const tilingSprite = new TilingSprite({
 *    texture: Texture.from('assets/image.png'),
 *    width: 100,
 *    height: 100,
 * });
 *
 * tilingSprite.tilePosition.x = 100;
 * tilingSprite.tilePosition.y = 100;
 *
 * app.stage.addChild(tilingSprite);
 * @memberof scene
 * @extends scene.Container
 */
export declare class TilingSprite extends Container implements View, Instruction {
    /**
     * Creates a new tiling sprite.
     * @param source - The source to create the texture from.
     * @param options - The options for creating the tiling sprite.
     * @returns A new tiling sprite.
     */
    static from(source: Texture | string, options?: TilingSpriteOptions): TilingSprite;
    /** default options for the TilingSprite */
    static defaultOptions: TilingSpriteOptions;
    readonly renderPipeId = "tilingSprite";
    readonly canBundle = true;
    readonly batched = true;
    _anchor: ObservablePoint;
    _tileTransform: Transform;
    _texture: Texture;
    _applyAnchorToTexture: boolean;
    _didTilingSpriteUpdate: boolean;
    _roundPixels: 0 | 1;
    private _bounds;
    private _boundsDirty;
    private _width;
    private _height;
    /**
     * @param {rendering.Texture | scene.TilingSpriteOptions} options - The options for creating the tiling sprite.
     */
    constructor(options?: Texture | TilingSpriteOptions);
    /** @deprecated since 8.0.0 */
    constructor(texture: Texture, width: number, height: number);
    /**
     * Changes frame clamping in corresponding textureMatrix
     * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
     * @default 0.5
     * @member {number}
     */
    get clampMargin(): number;
    set clampMargin(value: number);
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
     * import { TilingSprite } from 'pixi.js';
     *
     * const sprite = new TilingSprite({texture: Texture.WHITE});
     * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
     */
    get anchor(): ObservablePoint;
    set anchor(value: PointData | number);
    /** The offset of the image that is being tiled. */
    get tilePosition(): ObservablePoint;
    set tilePosition(value: PointData);
    /** The scaling of the image that is being tiled. */
    get tileScale(): ObservablePoint;
    set tileScale(value: PointData | number);
    set tileRotation(value: number);
    /** The rotation of the image that is being tiled. */
    get tileRotation(): number;
    /** The transform of the image that is being tiled. */
    get tileTransform(): Transform;
    /**
     *  Whether or not to round the x/y position of the sprite.
     * @type {boolean}
     */
    get roundPixels(): boolean;
    set roundPixels(value: boolean);
    /**
     * The local bounds of the sprite.
     * @type {rendering.Bounds}
     */
    get bounds(): BoundsData;
    set texture(value: Texture);
    /** The texture that the sprite is using. */
    get texture(): Texture;
    /** The width of the tiling area. */
    set width(value: number);
    get width(): number;
    set height(value: number);
    /** The height of the tiling area. */
    get height(): number;
    private _updateBounds;
    /**
     * Adds the bounds of this object to the bounds object.
     * @param bounds - The output bounds object.
     */
    addBounds(bounds: Bounds): void;
    /**
     * Checks if the object contains the given point.
     * @param point - The point to check
     */
    containsPoint(point: PointData): boolean;
    private _onTilingSpriteUpdate;
    /**
     * Destroys this sprite renderable and optionally its texture.
     * @param options - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
     * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
     */
    destroy(options?: DestroyOptions): void;
}
