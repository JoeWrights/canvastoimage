const path = require('path'); 
const { babel } = require('@rollup/plugin-babel');

const pkg = require('./package.json');

const babelOptions = {
  "presets": ['@babel/preset-env'],
}

module.exports = [
  {
    input: path.resolve(__dirname, './src/canvastoimage.js'),
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: pkg.name
      }
    ],
    plugins: [
      babel(babelOptions),
    ],
  },
]
