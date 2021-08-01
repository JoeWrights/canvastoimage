const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const template = require('rollup-plugin-generate-html-template')
const commonjs = require('@rollup/plugin-commonjs')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')

const pkg = require('./package.json')

const pathResolve = (dir) => {
  return path.resolve(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production'

const babelOptions = {
  "babelHelpers": "runtime",
  "presets": [
    [
      '@babel/env', {
        "modules": false
      }
    ]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "regenerator": true
    }]
  ]
}

const plugins = [
  babel(babelOptions),
    template({
      template: pathResolve('./example/index.html'),
      target: pathResolve('./docs/index.html'),
      replaceVars: {
        '__PUBLIC_PATH__CANVASTOIMAGE__': isProduction ? `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/canvastoimage.js` : '../dist/canvastoimage.js',
        '__PUBLIC_PATH__INDEX__': isProduction ? 'https://joewrights.github.io/canvastoimage/index.js' : './index.js'
      }
    }),
    nodeResolve(),
    commonjs()
]

if (isProduction) {
  plugins.push(serve({
    open: true,
    port: 3001
  }),
  livereload('./docs/'))
}

module.exports = [{
  input: pathResolve('./example/index.js'),
  output: [{
    file: pathResolve('./docs/index.js'),
    format: 'umd',
    name: 'example'
  }],
  plugins
}, ]