import { ExtensionType } from '../../../extensions/Extensions.mjs';
import { loadTextures } from '../../loader/parsers/textures/loadTextures.mjs';
import { Resolver } from '../Resolver.mjs';

"use strict";
const resolveTextureUrl = {
  extension: ExtensionType.ResolveParser,
  test: loadTextures.test,
  parse: (value) => ({
    resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
    format: value.split(".").pop(),
    src: value
  })
};

export { resolveTextureUrl };
//# sourceMappingURL=resolveTextureUrl.mjs.map
