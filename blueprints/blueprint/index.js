module.exports = {
  description() {
    return 'generates a blueprint and definition'
  },
  fileMapTokens() {
    return {
      __name__(options) {
        return options.entity.name
      }
    }
  }
}
