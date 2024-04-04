import { Matrix } from '../../maths/matrix/Matrix';
import { InstructionSet } from '../../rendering/renderers/shared/instructions/InstructionSet';
import type { Instruction } from '../../rendering/renderers/shared/instructions/Instruction';
import type { Container } from './Container';
/**
 * The render group is the base class for all render groups
 * It is used to render a group of containers together
 * @memberof rendering
 */
export declare class RenderGroup implements Instruction {
    renderPipeId: string;
    root: Container;
    canBundle: boolean;
    renderGroupParent: RenderGroup;
    renderGroupChildren: RenderGroup[];
    private readonly _children;
    worldTransform: Matrix;
    worldColorAlpha: number;
    worldColor: number;
    worldAlpha: number;
    readonly childrenToUpdate: Record<number, {
        list: Container[];
        index: number;
    }>;
    updateTick: number;
    readonly childrenRenderablesToUpdate: {
        list: Container[];
        index: number;
    };
    structureDidChange: boolean;
    instructionSet: InstructionSet;
    private readonly _onRenderContainers;
    constructor(root: Container);
    get localTransform(): Matrix;
    addRenderGroupChild(renderGroupChild: RenderGroup): void;
    private _removeRenderGroupChild;
    addChild(child: Container): void;
    removeChild(child: Container): void;
    onChildUpdate(child: Container): void;
    updateRenderable(container: Container): void;
    onChildViewUpdate(child: Container): void;
    private _removeChildFromUpdate;
    get isRenderable(): boolean;
    /**
     * adding a container to the onRender list will make sure the user function
     * passed in to the user defined 'onRender` callBack
     * @param container - the container to add to the onRender list
     */
    addOnRender(container: Container): void;
    removeOnRender(container: Container): void;
    runOnRender(): void;
}
