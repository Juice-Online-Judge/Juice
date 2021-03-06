require('babel-register')
const path = require('path')
const webpack = require('webpack')
const config = require('../config').default

const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&')

module.exports = {
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: /(src|flexboxgrid)/,
        loaders: ['style', cssLoader, 'postcss', 'sass']
      },
      {
        test: /\.css$/,
        include: /(src|flexboxgrid)/,
        loaders: ['style', cssLoader, 'postcss']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [new webpack.DefinePlugin(config.globals)]
}
