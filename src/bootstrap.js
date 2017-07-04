import {addMethod, mixed} from 'yup'

require('babel-runtime/core-js/promise').default = require('pinkie')

addMethod(mixed, 'sameAs', function (ref, message) {
  return this.test('sameAs', message, function (value) {
    const oth = this.resolve(ref)
    return !oth || !value || value === oth
  })
})
