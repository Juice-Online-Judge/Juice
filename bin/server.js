require('babel-register');

const express = require('express');
const url = require('url');
const config = require('../config');
const debug = require('debug')('app:bin:server');
const proxy = require('proxy-middleware');
const webpack = require('webpack');
const webpackConfig = require('../build/webpack.config');
const WebpackDevServer = require('webpack-dev-server');

const port = config.server_port;
const host = config.server_host;
const paths = config.utils_paths;

const publicPath = webpackConfig.output.publicPath;

const compiler = webpack(webpackConfig);
const app = new WebpackDevServer(compiler, {
  publicPath,
  contentBase: paths.base(config.dir_client),
  hot: true,
  quiet: config.compiler_quiet,
  noInfo: config.compiler_quiet,
  lazy: false,
  stats: config.compiler_stats,
  proxy: {
    '/*': {
      target: 'http://localhost:8000'
    }
  }
});

// Serve static assets from ~/src/static since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into ~/dist
app.listen(port);
