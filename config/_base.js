/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

const debug = _debug('app:config:_base')
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '../'),
  dir_client : 'src',
  dir_dist   : 'public',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : process.env.APP_URL || 'localhost',
  server_port : process.env.APP_PORT || 80,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_output_name     : '[name].js',
  compiler_chunk_name     : '[name].js',
  compiler_css_modules     : true,
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendor : [
    'axios',
    'babel-polyfill',
    'bluebird',
    'classnames',
    'codemirror',
    'decko',
    'flexboxgrid',
    'history',
    'highlight.js',
    'immutable',
    'normalizr',
    'qwery',
    'react',
    'react-clipboard.js',
    'react-codemirror',
    'react-redux',
    'react-remarkable',
    'react-router',
    'redux',
    'redux-actions',
    'redux-thunk',
    'react-flexbox-grid',
    'react-router-redux',
    'react-router-scroll',
    'react-tap-event-plugin',
    'reselect',
    'recompose',
    'radium',
    'store',
    'validate.js'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled   : !argv.watch,
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'html', dir : 'coverage' }
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc

const apiSubtree = config.env === 'production' ? 'vnd' : 'x'
const apiSubtype = process.env.API_SUBTYPE
const apiVersion = process.env.API_VERSION
const apiHeader = `application/${apiSubtree}.${apiSubtype}.${apiVersion}+json`

config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  'API_HEADER'   : JSON.stringify(apiHeader),
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development' && !argv.no_debug,
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.\n` +
      'Consider removing it from vendor_dependencies in ~/config/_base.js'
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve

  const base = (...args) =>
    Reflect.apply(resolve, null, [config.path_base, ...args])

  return {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist)
  }
})()

export default config
