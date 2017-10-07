function json () {
  return (context, utils) =>
    utils.addLoader({
      test: /\.json$/,
      loader: 'json-loader'
    })
}

export default json
