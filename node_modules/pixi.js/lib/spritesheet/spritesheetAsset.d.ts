import { Spritesheet } from './Spritesheet';
import type { AssetExtension } from '../assets/AssetExtension';
import type { SpritesheetData } from './Spritesheet';
export interface SpriteSheetJson extends SpritesheetData {
    meta: {
        image: string;
        scale: string;
        related_multi_packs?: string[];
    };
}
/**
 * Asset extension for loading spritesheets
 * @example
 * import { Assets } from 'pixi.js';
 *
 * Assets.load({
 *     alias: 'spritesheet',
 *     src: 'path/to/spritesheet.json',
 *     data: {
 *         ignoreMultiPack: true,
 *     }
 * })
 * @type {AssetExtension}
 * @memberof assets
 */
export declare const spritesheetAsset: AssetExtension<SpriteSheetJson | Spritesheet<SpritesheetData>, any>;
