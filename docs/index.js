
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var generateHtml2CanvasOpts = function generateHtml2CanvasOpts(dom) {
    var offsetWidth = dom.offsetWidth,
        offsetHeight = dom.offsetHeight;
    var width = offsetWidth;
    var height = offsetHeight;
    var canvas = document.createElement('canvas');
    var scale = 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    var context = canvas.getContext('2d');
    context.scale(scale, scale);
    return {
      width: width,
      height: height,
      taintTest: true,
      // 在渲染前测试图片
      timeout: 200,
      logging: false,
      allowTaint: true,
      useCORS: true
    };
  };

  var dom = document.querySelector('.example');
  var opts = generateHtml2CanvasOpts(dom);
  var width = opts.width,
      height = opts.height;
  document.querySelector('.btn').addEventListener('click', function () {
    html2canvas(dom, opts).then(function (canvas) {
      canvastoimage.saveAsPNG(canvas, width, height, 'example');
    });
  });

})));
