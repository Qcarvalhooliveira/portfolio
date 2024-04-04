import { ExtensionType } from '../../../extensions/Extensions';
import { State } from '../../renderers/shared/state/State';
import type { Geometry } from '../../renderers/shared/geometry/Geometry';
import type { InstructionSet } from '../../renderers/shared/instructions/InstructionSet';
import type { BatchPipe, InstructionPipe } from '../../renderers/shared/instructions/RenderPipe';
import type { Renderer } from '../../renderers/types';
import type { Batch, BatchableObject } from './Batcher';
export interface BatcherAdaptor {
    start(batchPipe: BatcherPipe, geometry: Geometry): void;
    init(batchPipe: BatcherPipe): void;
    execute(batchPipe: BatcherPipe, batch: Batch): void;
    destroy(): void;
    contextChange?(): void;
}
export declare class BatcherPipe implements InstructionPipe<Batch>, BatchPipe {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGLPipes, ExtensionType.WebGPUPipes, ExtensionType.CanvasPipes];
        readonly name: "batch";
    };
    state: State;
    renderer: Renderer;
    private _batches;
    private _geometries;
    private _adaptor;
    private _activeBatch;
    private _activeGeometry;
    constructor(renderer: Renderer, adaptor: BatcherAdaptor);
    buildStart(instructionSet: InstructionSet): void;
    addToBatch(batchableObject: BatchableObject): void;
    break(instructionSet: InstructionSet): void;
    buildEnd(instructionSet: InstructionSet): void;
    upload(instructionSet: InstructionSet): void;
    execute(batch: Batch): void;
    destroy(): void;
}
