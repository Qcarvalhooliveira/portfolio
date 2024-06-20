import type { Container } from '../Container';
export interface ChildrenHelperMixin {
    allowChildren: boolean;
    addChild<U extends Container[]>(...children: U): U[0];
    removeChild<U extends Container[]>(...children: U): U[0];
    removeChildren(beginIndex?: number, endIndex?: number): Container[];
    removeChildAt<U extends Container>(index: number): U;
    getChildAt<U extends Container>(index: number): U;
    setChildIndex(child: Container, index: number): void;
    getChildIndex(child: Container): number;
    addChildAt<U extends Container>(child: U, index: number): U;
    swapChildren<U extends Container>(child: U, child2: U): void;
    removeFromParent(): void;
}
export declare const childrenHelperMixin: Partial<Container>;
