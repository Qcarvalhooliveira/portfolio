/// <reference types="@webgpu/types" />
import { ExtensionType } from '../../../../extensions/Extensions';
import type { System } from '../../shared/system/System';
import type { GPU } from '../GpuDeviceSystem';
import type { GpuProgram } from './GpuProgram';
export interface GPUProgramData {
    bindGroups: GPUBindGroupLayout[];
    pipeline: GPUPipelineLayout;
}
/**
 * A system that manages the rendering of GpuPrograms.
 * @memberof rendering
 */
export declare class GpuShaderSystem implements System {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGPUSystem];
        readonly name: "shader";
    };
    private _gpu;
    private readonly _gpuProgramData;
    protected contextChange(gpu: GPU): void;
    getProgramData(program: GpuProgram): GPUProgramData;
    private _createGPUProgramData;
    destroy(): void;
}
