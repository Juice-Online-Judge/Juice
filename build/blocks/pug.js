function pug () {
  return (context, utils) =>
    utils.addLoader({
      test: /\.pug$/,
      loader: 'pug-loader'
    })
}

export default pug
