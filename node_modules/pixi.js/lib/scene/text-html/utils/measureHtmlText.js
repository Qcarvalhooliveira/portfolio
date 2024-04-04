'use strict';

var CanvasTextMetrics = require('../../text/canvas/CanvasTextMetrics.js');
var HTMLTextRenderData = require('../HTMLTextRenderData.js');

"use strict";
let tempHTMLTextRenderData;
function measureHtmlText(text, style, fontStyleCSS, htmlTextRenderData) {
  htmlTextRenderData = htmlTextRenderData || tempHTMLTextRenderData || (tempHTMLTextRenderData = new HTMLTextRenderData.HTMLTextRenderData());
  const { domElement, styleElement, svgRoot } = htmlTextRenderData;
  domElement.innerHTML = `<style>${style.cssStyle}</style><div>${text}</div>`;
  domElement.setAttribute("style", "transform-origin: top left; display: inline-block");
  if (fontStyleCSS) {
    styleElement.textContent = fontStyleCSS;
  }
  document.body.appendChild(svgRoot);
  const contentBounds = domElement.getBoundingClientRect();
  svgRoot.remove();
  const descenderPadding = CanvasTextMetrics.CanvasTextMetrics.measureFont(style.fontStyle).descent;
  return {
    width: contentBounds.width,
    height: contentBounds.height + descenderPadding
  };
}

exports.measureHtmlText = measureHtmlText;
//# sourceMappingURL=measureHtmlText.js.map
