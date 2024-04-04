import { ExtensionType } from '../../extensions/Extensions';
import { Texture } from '../../rendering/renderers/shared/texture/Texture';
import { BatchableSprite } from '../sprite/BatchableSprite';
import type { RenderPipe } from '../../rendering/renderers/shared/instructions/RenderPipe';
import type { Renderer } from '../../rendering/renderers/types';
import type { HTMLText } from './HTMLText';
export declare class HTMLTextPipe implements RenderPipe<HTMLText> {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGLPipes, ExtensionType.WebGPUPipes, ExtensionType.CanvasPipes];
        readonly name: "htmlText";
    };
    private _renderer;
    private _gpuText;
    constructor(renderer: Renderer);
    validateRenderable(htmlText: HTMLText): boolean;
    addRenderable(htmlText: HTMLText): void;
    updateRenderable(htmlText: HTMLText): void;
    destroyRenderable(htmlText: HTMLText): void;
    private _destroyRenderableById;
    private _updateText;
    private _updateGpuText;
    private _getGpuText;
    initGpuText(htmlText: HTMLText): {
        textureNeedsUploading: boolean;
        generatingTexture: boolean;
        texture: Texture;
        currentKey: string;
        batchableSprite: BatchableSprite;
    };
    destroy(): void;
}
