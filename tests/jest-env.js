import jasmineEnzyme from 'jasmine-enzyme'
import jasmineImmutable from 'jasmine-immutable-matchers'

beforeEach(() => {
  jasmineEnzyme()
  jasmine.addMatchers(jasmineImmutable)
})
