import { UniformGroup } from '../../shared/shader/UniformGroup';
export declare const batchSamplersUniformGroup: UniformGroup<{
    uTextures: {
        value: Int32Array;
        type: "i32";
        size: number;
    };
}>;
