const generateHtml2CanvasOpts = (dom) => {
  const {
    offsetWidth,
    offsetHeight
  } = dom
  const width = offsetWidth
  const height = offsetHeight
  const canvas = document.createElement('canvas')
  const scale = 1
  canvas.width = width * scale
  canvas.height = height * scale
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  const context = canvas.getContext('2d')
  context.scale(scale, scale)
  return {
    width,
    height,
    taintTest: true, // 在渲染前测试图片
    timeout: 200,
    logging: false,
    allowTaint: true,
    useCORS: true
  }
}
const dom = document.querySelector('.example')
const opts = generateHtml2CanvasOpts(dom)
const {
  width,
  height
} = opts
document.querySelector('.btn').addEventListener('click', () => {
  html2canvas(dom, opts).then(canvas => {
    canvastoimage.saveAsPNG(canvas, width, height, 'example')
  })
})
