/// <reference types="@webgpu/types" />
import { ExtensionType } from '../../../../extensions/Extensions';
import { BindGroup } from '../shader/BindGroup';
import type { ICanvas } from '../../../../environment/canvas/ICanvas';
import type { System } from '../../shared/system/System';
import type { CanvasGenerator, GetPixelsOutput } from '../../shared/texture/GenerateCanvas';
import type { TextureSource } from '../../shared/texture/sources/TextureSource';
import type { BindableTexture, Texture } from '../../shared/texture/Texture';
import type { TextureStyle } from '../../shared/texture/TextureStyle';
import type { GPU } from '../GpuDeviceSystem';
import type { WebGPURenderer } from '../WebGPURenderer';
/**
 * The system that handles textures for the GPU.
 * @memberof rendering
 */
export declare class GpuTextureSystem implements System, CanvasGenerator {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGPUSystem];
        readonly name: "texture";
    };
    readonly managedTextures: TextureSource[];
    protected CONTEXT_UID: number;
    private _gpuSources;
    private _gpuSamplers;
    private _bindGroupHash;
    private _textureViewHash;
    private readonly _uploads;
    private _gpu;
    private _mipmapGenerator?;
    private readonly _renderer;
    constructor(renderer: WebGPURenderer);
    protected contextChange(gpu: GPU): void;
    initSource(source: TextureSource): GPUTexture;
    protected onSourceUpdate(source: TextureSource): void;
    protected onSourceUnload(source: TextureSource): void;
    protected onUpdateMipmaps(source: TextureSource): void;
    protected onSourceDestroy(source: TextureSource): void;
    protected onSourceResize(source: TextureSource): void;
    private _initSampler;
    getGpuSampler(sampler: TextureStyle): GPUSampler;
    getGpuSource(source: TextureSource): GPUTexture;
    getTextureBindGroup(texture: Texture): BindGroup;
    private _createTextureBindGroup;
    getTextureView(texture: BindableTexture): GPUTextureView;
    private _createTextureView;
    generateCanvas(texture: Texture): ICanvas;
    getPixels(texture: Texture): GetPixelsOutput;
    destroy(): void;
}
