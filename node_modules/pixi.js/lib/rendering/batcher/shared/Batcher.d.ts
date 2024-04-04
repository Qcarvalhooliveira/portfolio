/// <reference types="@webgpu/types" />
import { ViewableBuffer } from '../../../utils/data/ViewableBuffer';
import { type BLEND_MODES } from '../../renderers/shared/state/const';
import { BatchTextureArray } from './BatchTextureArray';
import type { BindGroup } from '../../renderers/gpu/shader/BindGroup';
import type { IndexBufferArray } from '../../renderers/shared/geometry/Geometry';
import type { Instruction } from '../../renderers/shared/instructions/Instruction';
import type { InstructionSet } from '../../renderers/shared/instructions/InstructionSet';
import type { Texture } from '../../renderers/shared/texture/Texture';
export type BatchAction = 'startBatch' | 'renderBatch';
/**
 * A batch pool is used to store batches when they are not currently in use.
 * @memberof rendering
 */
export declare class Batch implements Instruction {
    renderPipeId: string;
    action: BatchAction;
    start: number;
    size: number;
    textures: BatchTextureArray;
    blendMode: BLEND_MODES;
    canBundle: boolean;
    /**
     * breaking rules slightly here in the name of performance..
     * storing references to these bindgroups here is just faster for access!
     * keeps a reference to the GPU bind group to set when rendering this batch for WebGPU. Will be null is using WebGL.
     */
    gpuBindGroup: GPUBindGroup;
    /**
     * breaking rules slightly here in the name of performance..
     * storing references to these bindgroups here is just faster for access!
     * keeps a reference to the bind group to set when rendering this batch for WebGPU. Will be null if using WebGl.
     */
    bindGroup: BindGroup;
    batcher: Batcher;
    destroy(): void;
}
export interface BatchableObject {
    indexStart: number;
    packAttributes: (float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number) => void;
    packIndex: (indexBuffer: IndexBufferArray, index: number, indicesOffset: number) => void;
    texture: Texture;
    blendMode: BLEND_MODES;
    vertexSize: number;
    indexSize: number;
    textureId: number;
    location: number;
    batcher: Batcher;
    batch: Batch;
    roundPixels: 0 | 1;
}
/**
 * The options for the batcher.
 * @ignore
 */
export interface BatcherOptions {
    /** The size of the vertex buffer. */
    vertexSize?: number;
    /** The size of the index buffer. */
    indexSize?: number;
}
/**
 * A batcher is used to batch together objects with the same texture.
 * @ignore
 */
export declare class Batcher {
    static defaultOptions: BatcherOptions;
    uid: number;
    attributeBuffer: ViewableBuffer;
    indexBuffer: IndexBufferArray;
    attributeSize: number;
    indexSize: number;
    elementSize: number;
    elementStart: number;
    dirty: boolean;
    batchIndex: number;
    batches: Batch[];
    private readonly _vertexSize;
    private _elements;
    private readonly _batchPool;
    private _batchPoolIndex;
    private readonly _textureBatchPool;
    private _textureBatchPoolIndex;
    private _batchIndexStart;
    private _batchIndexSize;
    constructor(options?: BatcherOptions);
    begin(): void;
    add(batchableObject: BatchableObject): void;
    checkAndUpdateTexture(batchableObject: BatchableObject, texture: Texture): boolean;
    updateElement(batchableObject: BatchableObject): void;
    /**
     * breaks the batcher. This happens when a batch gets too big,
     * or we need to switch to a different type of rendering (a filter for example)
     * @param instructionSet
     */
    break(instructionSet: InstructionSet): void;
    private _finishBatch;
    finish(instructionSet: InstructionSet): void;
    /**
     * Resizes the attribute buffer to the given size (1 = 1 float32)
     * @param size - the size in vertices to ensure (not bytes!)
     */
    ensureAttributeBuffer(size: number): void;
    /**
     * Resizes the index buffer to the given size (1 = 1 float32)
     * @param size - the size in vertices to ensure (not bytes!)
     */
    ensureIndexBuffer(size: number): void;
    private _resizeAttributeBuffer;
    private _resizeIndexBuffer;
    destroy(): void;
}
