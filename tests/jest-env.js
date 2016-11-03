import 'jest-enzyme/lib'
import * as jasmineImmutable from 'jasmine-immutable-matchers'

beforeEach(() => {
  jasmine.addMatchers(jasmineImmutable)
})
