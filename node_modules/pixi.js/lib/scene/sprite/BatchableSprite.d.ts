import type { Batch, BatchableObject, Batcher } from '../../rendering/batcher/shared/Batcher';
import type { IndexBufferArray } from '../../rendering/renderers/shared/geometry/Geometry';
import type { Texture } from '../../rendering/renderers/shared/texture/Texture';
import type { BoundsData } from '../container/bounds/Bounds';
import type { Container } from '../container/Container';
/**
 * A batchable sprite object.
 * @ignore
 */
export declare class BatchableSprite implements BatchableObject {
    indexStart: number;
    renderable: Container;
    vertexSize: number;
    indexSize: number;
    texture: Texture;
    textureId: number;
    location: number;
    batcher: Batcher;
    batch: Batch;
    bounds: BoundsData;
    roundPixels: 0 | 1;
    get blendMode(): import("../..").BLEND_MODES;
    packAttributes(float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number): void;
    packIndex(indexBuffer: IndexBufferArray, index: number, indicesOffset: number): void;
    reset(): void;
}
