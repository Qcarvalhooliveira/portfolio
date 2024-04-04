import { extensions } from '../../extensions/Extensions.mjs';
import { loadBitmapFont, bitmapFontCachePlugin } from './asset/loadBitmapFont.mjs';
import { BitmapTextPipe } from './BitmapTextPipe.mjs';

"use strict";
extensions.add(BitmapTextPipe, loadBitmapFont, bitmapFontCachePlugin);
//# sourceMappingURL=init.mjs.map
