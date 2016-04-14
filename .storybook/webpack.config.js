const path = require('path');

module.exports = {
  module: {
    resolve: {
      root: path.resolve(__dirname, '../src'),
      extensions: ['', '.js', '.jsx']
    }
  }
};
