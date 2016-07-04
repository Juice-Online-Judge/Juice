export default {
  path: 'dashboard',
  getComponent(_location, next) {
    require.ensure(['./components/DashBoardView'], (require) => {
      next(null, require('./components/DashBoardView'))
    })
  }
}
