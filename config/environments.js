/* eslint key-spacing:0 */

export default {
  production: (config) => ({
    compiler_output_name     : '[name].[hash].js',
    compiler_hash_type       : 'chunkhash',
    compiler_stats           : {
      chunks : true,
      chunkModules : true,
      colors : true
    }
  })
}
