import _debug from 'debug'
import runCompiler from './run-compiler'

const debug = _debug('app:bin:compile')

runCompiler({
  debug,
  json: process.argv[2] === '--json'
})
