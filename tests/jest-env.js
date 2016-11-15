import 'jest-enzyme/lib'
import * as jasmineImmutable from 'jasmine-immutable-matchers'
import mapValues from 'lodash/mapValues'

const jestImmutable = mapValues(jasmineImmutable, (matcherFactory) => {
  const matcher = matcherFactory()
  return function() {
    const { isNot } = this
    const { pass, message } = matcher[isNot ? 'negativeCompare' : 'compare'](...arguments)
    return {
      pass: Boolean(pass),
      message
    }
  }
})

expect.extend(jestImmutable)
