import { ExtensionType } from '../../../extensions/Extensions';
import type { ICanvas } from '../../../environment/canvas/ICanvas';
import type { ICanvasRenderingContext2D } from '../../../environment/canvas/ICanvasRenderingContext2D';
import type { System } from '../../../rendering/renderers/shared/system/System';
import type { Texture } from '../../../rendering/renderers/shared/texture/Texture';
import type { TextStyle } from '../TextStyle';
interface CanvasAndContext {
    canvas: ICanvas;
    context: ICanvasRenderingContext2D;
}
/**
 * System plugin to the renderer to manage canvas text.
 * @memberof rendering
 */
export declare class CanvasTextSystem implements System {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGLSystem, ExtensionType.WebGPUSystem, ExtensionType.CanvasSystem];
        readonly name: "canvasText";
    };
    private _activeTextures;
    getTextureSize(text: string, resolution: number, style: TextStyle): {
        width: number;
        height: number;
    };
    getTexture(text: string, resolution: number, style: TextStyle, textKey: string): Texture;
    private _increaseReferenceCount;
    decreaseReferenceCount(textKey: string): void;
    getReferenceCount(textKey: string): number;
    /**
     * Renders text to its canvas, and updates its texture.
     *
     * By default this is used internally to ensure the texture is correct before rendering,
     * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
     * and then shared across multiple Sprites.
     * @param text
     * @param style
     * @param resolution
     * @param canvasAndContext
     */
    renderTextToCanvas(text: string, style: TextStyle, resolution: number, canvasAndContext: CanvasAndContext): void;
    /**
     * Render the text with letter-spacing.
     * @param text - The text to draw
     * @param style
     * @param canvasAndContext
     * @param x - Horizontal position to draw the text
     * @param y - Vertical position to draw the text
     * @param isStroke - Is this drawing for the outside stroke of the
     *  text? If not, it's for the inside fill
     */
    private _drawLetterSpacing;
    destroy(): void;
}
export {};
