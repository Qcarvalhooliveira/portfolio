import { ExtensionType } from '../../../extensions/Extensions';
import type { Geometry } from '../../renderers/shared/geometry/Geometry';
import type { Batch } from '../shared/Batcher';
import type { BatcherAdaptor, BatcherPipe } from '../shared/BatcherPipe';
/**
 * A BatcherAdaptor that uses the GPU to render batches.
 * @memberof rendering
 * @ignore
 */
export declare class GpuBatchAdaptor implements BatcherAdaptor {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGPUPipesAdaptor];
        readonly name: "batch";
    };
    private _shader;
    private _geometry;
    init(): void;
    start(batchPipe: BatcherPipe, geometry: Geometry): void;
    execute(batchPipe: BatcherPipe, batch: Batch): void;
    destroy(): void;
}
