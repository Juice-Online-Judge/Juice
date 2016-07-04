export default {
  path: 'questions',
  getComponent(_location, next) {
    require.ensure(['./components/ExamQuestionDetail'], (require) => {
      next(null, require('./components/ExamQuestionDetail'))
    })
  }
}
