import type { InstructionSet } from '../../../rendering/renderers/shared/instructions/InstructionSet';
import type { RenderPipes } from '../../../rendering/renderers/types';
import type { Container } from '../Container';
import type { RenderGroup } from '../RenderGroup';
export declare function buildInstructions(renderGroup: RenderGroup, renderPipes: RenderPipes): void;
export declare function collectAllRenderables(container: Container, instructionSet: InstructionSet, rendererPipes: RenderPipes): void;
