module.exports = {
  description() {
    return 'generate routes'
  },
  fileMapTokens() {
    return {
      __name__(options) {
        return options.entity.name
      }
    }
  }
}
