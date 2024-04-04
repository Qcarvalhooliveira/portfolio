import { ExtensionType } from '../../../extensions/Extensions';
import { BitmapFont } from '../BitmapFont';
import type { LoaderParser } from '../../../assets/loader/parsers/LoaderParser';
/** simple loader plugin for loading in bitmap fonts! */
export declare const bitmapFontCachePlugin: {
    extension: ExtensionType;
    test: (asset: BitmapFont) => boolean;
    getCacheableAssets(keys: string[], asset: BitmapFont): Record<string, BitmapFont>;
};
export declare const loadBitmapFont: LoaderParser<any, any, Record<string, any>>;
