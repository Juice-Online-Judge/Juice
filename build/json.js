function json() {
  return context => ({
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    }
  })
}

export default json
