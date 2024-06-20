import type { WebGLOptions } from './gl/WebGLRenderer';
import type { WebGPUOptions } from './gpu/WebGPURenderer';
import type { Renderer } from './types';
/**
 * Options for {@link rendering.autoDetectRenderer}.
 * @memberof rendering
 */
export interface AutoDetectOptions extends WebGLOptions, WebGPUOptions {
    /** The preferred renderer type. WebGPU is recommended as its generally faster than WebGL. */
    preference?: 'webgl' | 'webgpu';
    /**
     * Whether to manage the dynamic imports of the renderer code. It is true by default, this means
     * PixiJS will load all the default pixi systems and extensions. If you set this to false, then
     * you as the dev will need to manually import the systems and extensions you need.
     */
    manageImports?: boolean;
    /** Optional WebGPUOptions to pass only to WebGPU renderer. */
    webgpu?: Partial<WebGPUOptions>;
    /** Optional WebGLOptions to pass only to the WebGL renderer */
    webgl?: Partial<WebGLOptions>;
}
/**
 * Automatically determines the most appropriate renderer for the current environment.
 *
 * The function will prioritize the WebGPU renderer, falling back to WebGL2 if WebGPU
 * is not supported. The selected renderer's code is then dynamically imported to optimize
 * performance and minimize the initial bundle size.
 *
 * To maximize the benefits of dynamic imports, it's recommended to use a modern bundler
 * that supports code splitting. This will place the renderer code in a separate chunk,
 * which is loaded only when needed.
 * @example
 *
 * // create a renderer
 * const renderer = await autoDetectRenderer({
 *   width: 800,
 *   height: 600,
 *   antialias: true,
 * });
 *
 * // custom for each renderer
 * const renderer = await autoDetectRenderer({
 *   width: 800,
 *   height: 600,
 *   webgpu:{
 *     antialias: true,
 *     backgroundColor: 'red'
 *   },
 *   webgl:{
 *     antialias: true,
 *     backgroundColor: 'green'
 *   }
 *  });
 * @param options - A partial configuration object based on the `AutoDetectOptions` type.
 * @returns A Promise that resolves to an instance of the selected renderer.
 * @memberof rendering
 */
export declare function autoDetectRenderer(options: Partial<AutoDetectOptions>): Promise<Renderer>;
