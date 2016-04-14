const path = require('path');

const cssLoader = [
    'css?modules',
    'sourceMap',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&');

module.exports = {
  resolve: {
    root: path.resolve(__dirname, '../src'),
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      include: /(src|flexboxgrid)/,
      loaders: [
        'style',
        cssLoader,
        'postcss',
        'sass'
      ]
    }, {
      test: /\.css$/,
      include: /(src|flexboxgrid)/,
      loaders: [
        'style',
        cssLoader,
        'postcss'
      ]
    }]
  }
};
