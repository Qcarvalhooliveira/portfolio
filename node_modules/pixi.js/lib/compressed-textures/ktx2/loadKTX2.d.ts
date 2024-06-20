import type { LoaderParser } from '../../assets/loader/parsers/LoaderParser';
import type { TextureSourceOptions } from '../../rendering/renderers/shared/texture/sources/TextureSource';
import type { Texture } from '../../rendering/renderers/shared/texture/Texture';
/** Loads KTX2 textures! */
export declare const loadKTX2: LoaderParser<Texture | Texture[], TextureSourceOptions<any>, Record<string, any>>;
