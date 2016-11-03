export default {
  path: 'about-us',
  getComponent(_location, next) {
    System.import('./components/AboutUsView')
      .then((AboutUsView) => next(null, AboutUsView))
  }
}
