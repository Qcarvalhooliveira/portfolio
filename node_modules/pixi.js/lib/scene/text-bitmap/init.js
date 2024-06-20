'use strict';

var Extensions = require('../../extensions/Extensions.js');
var loadBitmapFont = require('./asset/loadBitmapFont.js');
var BitmapTextPipe = require('./BitmapTextPipe.js');

"use strict";
Extensions.extensions.add(BitmapTextPipe.BitmapTextPipe, loadBitmapFont.loadBitmapFont, loadBitmapFont.bitmapFontCachePlugin);
//# sourceMappingURL=init.js.map
