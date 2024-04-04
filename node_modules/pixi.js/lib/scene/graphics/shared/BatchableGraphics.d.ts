import type { Batch, BatchableObject, Batcher } from '../../../rendering/batcher/shared/Batcher';
import type { IndexBufferArray } from '../../../rendering/renderers/shared/geometry/Geometry';
import type { Texture } from '../../../rendering/renderers/shared/texture/Texture';
import type { Graphics } from './Graphics';
/**
 * A batchable graphics object.
 * @ignore
 */
export declare class BatchableGraphics implements BatchableObject {
    indexStart: number;
    textureId: number;
    texture: Texture;
    location: number;
    batcher: Batcher;
    batch: Batch;
    renderable: Graphics;
    indexOffset: number;
    indexSize: number;
    vertexOffset: number;
    vertexSize: number;
    color: number;
    alpha: number;
    applyTransform: boolean;
    roundPixels: 0 | 1;
    geometryData: {
        vertices: number[];
        uvs: number[];
        indices: number[];
    };
    get blendMode(): import("../../..").BLEND_MODES;
    packIndex(indexBuffer: IndexBufferArray, index: number, indicesOffset: number): void;
    packAttributes(float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number): void;
    get vertSize(): number;
    copyTo(gpuBuffer: BatchableGraphics): void;
    reset(): void;
}
