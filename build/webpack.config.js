import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const { __DEV__, __PROD__ } = config.globals

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  context: paths.base(config.dir_client),
  resolve: {
    modules: [
      paths.base(config.dir_client),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = paths.base(config.dir_client) + '/main.js'

webpackConfig.entry = {
  app: [APP_ENTRY_PATH],
  vendor: config.compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: config.compiler_output_name,
  chunkFilename: config.compiler_chunk_name,
  path: paths.base(config.dir_dist),
  publicPath: config.compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        cssnano({
          sourcemap: true,
          autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions']
          },
          safe: true,
          discardComments: {
            removeAll: true
          }
        })
      ],
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
]

if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe, & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})
  )
}

webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor'],
  chunks: ['app']
}))

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON

const presets = [
  ['env', {
    targets: {
      browsers: ['last 2 versions', 'safari >= 10']
    },
    modules: false
  }],
  'react',
  'stage-0'
]

if (__PROD__) {
  presets.push('react-optimize')
}

webpackConfig.module.rules = [{
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
  options: {
    configFile: paths.base('.eslintrc'),
    emitWarning: __DEV__
  }
}, {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: [
      'transform-runtime',
      'add-module-exports',
      'transform-decorators-legacy'
    ],
    presets
  }
}, {
  test: /\.json$/,
  loader: 'json-loader'
}, {
  test: /\.pug$/,
  loader: 'pug-loader'
}]

// Styles
const cssOptions = !config.compiler_css_modules
  ? {
    context: paths.base(config.dir_client),
    sourceMap: true
  }
  : {
    context: paths.base(config.dir_client),
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }

webpackConfig.module.rules.push({
  test: /\.scss$/,
  include: /(src|flexboxgrid)/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: cssOptions
  }, {
    loader: 'postcss-loader'
  }, {
    loader: 'sass-loader'
  }]
})

webpackConfig.module.rules.push({
  test: /\.css$/,
  include: /(src|flexboxgrid)/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: cssOptions
  }, {
    loader: 'postcss-loader'
  }]
})

// Don't treat global SCSS as modules
webpackConfig.module.rules.push({
  test: /\.scss$/,
  exclude: /(src|flexboxgrid)/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      context: paths.base(config.dir_client),
      sourceMap: true
    }
  }, {
    loader: 'postcss-loader'
  }, {
    loader: 'sass-loader'
  }]
})

// Don't treat global, third-party CSS as modules
webpackConfig.module.rules.push({
  test: /\.css$/,
  exclude: /(src|flexboxgrid)/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      context: paths.base(config.dir_client),
      sourceMap: true
    }
  }, {
    loader: 'postcss-loader'
  }]
})

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url-loader?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.rules.filter(rule =>
    rule.use && rule.use.find(r => /css/.test(r.loader))
  ).forEach(rule => {
    const [first, ...rest] = rule.use
    rule.loader = ExtractTextPlugin.extract({
      fallback: first.loader,
      use: rest.map((loader) => {
        return loader.options
          ? `${loader.loader}?${JSON.stringify(loader.options)}`
          : loader.loader
      }).join('!')
    })
    Reflect.deleteProperty(rule, 'use')
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    })
  )
}

export default webpackConfig
