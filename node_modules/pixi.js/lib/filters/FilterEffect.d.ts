import type { Rectangle } from '../maths/shapes/Rectangle';
import type { Effect } from '../scene/container/Effect';
import type { Filter } from './Filter';
export declare class FilterEffect implements Effect {
    filters: Filter[];
    filterArea?: Rectangle;
    pipe: string;
    priority: number;
    constructor(options?: {
        filters: Filter[];
        filterArea?: Rectangle;
    });
    destroy(): void;
}
