function pug () {
  return context => ({
    module: {
      loaders: [
        {
          test: /\.pug$/,
          loader: 'pug-loader'
        }
      ]
    }
  })
}

export default pug
