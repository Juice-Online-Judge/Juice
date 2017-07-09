import _debug from 'debug'
import webpack from 'webpack'
import BabiliPlugin from 'babili-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'

import {
  createConfig,
  defineConstants,
  env,
  entryPoint,
  setOutput,
  addPlugins,
  customConfig,
  setContext,
  setDevTool,
  sourceMaps
} from '@webpack-blocks/webpack2'
import postcss from '@webpack-blocks/postcss'
import sass from '@webpack-blocks/sass'
import babel from './blocks/babel'
import extractText from './blocks/extract-text'
import json from './blocks/json'
import pug from './blocks/pug'

import config from '../config'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const {__PROD__} = config.globals
const APP_ENTRY_PATH = paths.base(config.dir_client) + '/main.js'

const presets = [
  [
    'env',
    {
      targets: {
        browsers: ['last 2 versions', 'safari >= 10']
      },
      modules: false
    }
  ],
  'react'
]

const basePlugins = [
  'transform-runtime',
  'transform-decorators-legacy',
  'transform-class-properties',
  'transform-export-extensions',
  'transform-object-rest-spread',
  'syntax-dynamic-import',
  'dev-expression',
  'idx',
  'polished',
  [
    'import-inspector',
    {
      webpackRequireWeakId: true
    }
  ]
]

const prodPlugins = [
  ['transform-react-remove-prop-types', {removeImport: true}],
  'transform-react-pure-class-to-function',
  'transform-react-inline-elements',
  'transform-react-constant-elements'
]

const plugins = __PROD__ ? basePlugins.concat(prodPlugins) : basePlugins

debug('Create config')

const webpackConfig = createConfig([
  entryPoint({
    app: [APP_ENTRY_PATH],
    vendor: config.compiler_vendor
  }),
  setOutput({
    filename: config.compiler_output_name,
    chunkFilename: config.compiler_chunk_name,
    path: paths.base(config.dir_dist),
    publicPath: config.compiler_public_path
  }),
  setContext(paths.base(config.dir_client)),
  setDevTool(config.compiler_devtool),
  customConfig({
    resolve: {
      modules: [paths.base(config.dir_client), 'node_modules']
    }
  }),
  pug(),
  json(),
  babel({
    babelrc: false,
    plugins,
    presets
  }),
  sass(),
  postcss(),
  defineConstants(config.globals),
  addPlugins([
    new webpack.IgnorePlugin(/.*/, /idx$/),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      chunks: ['app']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 3
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: paths.client('styles')
        }
      }
    }),
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'app'],
      template: paths.client('index.pug'),
      hash: false,
      favicon: paths.dist('favicon.ico'),
      filename: '../resources/views/main.blade.php',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        minifyJS: false
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ]),
  env('development', [sourceMaps()]),
  env('production', [
    addPlugins([
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
      new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
      new BabiliPlugin({
        removeDebugger: true
      }),
      new CompressionPlugin()
    ]),
    extractText('[name].[contenthash].css')
  ])
])

export default webpackConfig
