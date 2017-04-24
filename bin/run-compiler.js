import path from 'path'
import fs from 'fs'
import pify from 'pify'
import webpackCompiler from '../build/webpack-compiler'
import webpackConfig from '../build/webpack.config'
import config from '../config'

export default async function ({debug, compilerConfig = {}, json = false}) {
  try {
    debug('Run compiler')
    const stats = await webpackCompiler({...webpackConfig, ...compilerConfig})
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    if (json) {
      await pify(fs.writeFile)(
        path.join(__dirname, '..', 'stats.json'),
        JSON.stringify(stats)
      )
      debug('Write state to state.json')
    }
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
}
