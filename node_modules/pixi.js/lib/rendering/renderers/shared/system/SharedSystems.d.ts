import { CustomRenderPipe } from '../../../../scene/container/CustomRenderPipe';
import { RenderGroupPipe } from '../../../../scene/container/RenderGroupPipe';
import { RenderGroupSystem } from '../../../../scene/container/RenderGroupSystem';
import { SpritePipe } from '../../../../scene/sprite/SpritePipe';
import { BatcherPipe } from '../../../batcher/shared/BatcherPipe';
import { AlphaMaskPipe } from '../../../mask/alpha/AlphaMaskPipe';
import { ColorMaskPipe } from '../../../mask/color/ColorMaskPipe';
import { StencilMaskPipe } from '../../../mask/stencil/StencilMaskPipe';
import { BackgroundSystem } from '../background/BackgroundSystem';
import { BlendModePipe } from '../blendModes/BlendModePipe';
import { ExtractSystem } from '../extract/ExtractSystem';
import { GenerateTextureSystem } from '../extract/GenerateTextureSystem';
import { GlobalUniformSystem } from '../renderTarget/GlobalUniformSystem';
import { HelloSystem } from '../startup/HelloSystem';
import { TextureGCSystem } from '../texture/TextureGCSystem';
import { ViewSystem } from '../view/ViewSystem';
import type { ExtractRendererOptions } from './utils/typeUtils';
export declare const SharedSystems: (typeof BackgroundSystem | typeof GenerateTextureSystem | typeof GlobalUniformSystem | typeof HelloSystem | typeof ViewSystem | typeof RenderGroupSystem | typeof TextureGCSystem | typeof ExtractSystem)[];
export declare const SharedRenderPipes: (typeof BlendModePipe | typeof BatcherPipe | typeof SpritePipe | typeof RenderGroupPipe | typeof AlphaMaskPipe | typeof StencilMaskPipe | typeof ColorMaskPipe | typeof CustomRenderPipe)[];
/**
 * Options for the shared systems of a renderer.
 * @memberof rendering
 */
export interface SharedRendererOptions extends ExtractRendererOptions<typeof SharedSystems>, PixiMixins.RendererOptions {
}
