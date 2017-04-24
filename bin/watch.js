import _debug from 'debug'
import runCompiler from './run-compiler'

const debug = _debug('app:bin:watch')
runCompiler({
  debug,
  compilerConfig: {watch: true}
})
