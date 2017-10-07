import 'jest-enzyme/lib'
import path from 'path'
import * as jasmineImmutable from 'jasmine-immutable-matchers'
import mapValues from 'lodash/mapValues'
import reporters from 'jasmine-reporters'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

const jestImmutable = mapValues(jasmineImmutable, matcherFactory => {
  const matcher = matcherFactory()
  return function () {
    const { isNot } = this
    const { pass, message } = matcher[isNot ? 'negativeCompare' : 'compare'](
      ...arguments
    )
    return {
      pass: Boolean(pass),
      message
    }
  }
})

if (process.env.NODE_ENV === 'test') {
  const savePath = path.join(
    process.env.CIRCLE_TEST_REPORTS || __dirname,
    'jest'
  )
  const junitReporter = new reporters.JUnitXmlReporter({
    savePath,
    consolidateAll: false
  })
  jasmine.getEnv().addReporter(junitReporter)
}

expect.extend(jestImmutable)
