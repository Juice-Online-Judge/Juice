export default {
  path: 'dashboard',
  getComponent(_location, next) {
    System.import('./components/DashBoardView').then(DashBoardView =>
      next(null, DashBoardView)
    )
  }
}
