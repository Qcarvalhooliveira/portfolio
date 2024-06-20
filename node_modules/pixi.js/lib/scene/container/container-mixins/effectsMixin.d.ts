import { FilterEffect } from '../../../filters/FilterEffect';
import type { Filter } from '../../../filters/Filter';
import type { Rectangle } from '../../../maths/shapes/Rectangle';
import type { Container } from '../Container';
import type { Effect } from '../Effect';
export interface EffectsMixinConstructor {
    mask?: number | Container | null;
    filters?: Filter | Filter[];
}
export interface EffectsMixin extends Required<EffectsMixinConstructor> {
    _mask?: {
        mask: unknown;
        effect: Effect;
    };
    _filters?: {
        filters: readonly Filter[];
        effect: FilterEffect;
        filterArea?: Rectangle;
    };
    filterArea?: Rectangle;
    effects?: Effect[];
    addEffect(effect: Effect): void;
    removeEffect(effect: Effect): void;
}
export declare const effectsMixin: Partial<Container>;
