import recaptcha, { createRecaptcha } from '../recaptcha-wrapper'

const WIDGET_ID = 'widgetId'
const recaptchaMock = {
  render: jest.fn(() => WIDGET_ID),
  reset: jest.fn(),
  execute: jest.fn()
}

describe('recaptcha', () => {
  describe('#createRecaptcha', () => {
    let ins

    beforeEach(() => {
      ins = createRecaptcha()
    })

    describe('#assertRecaptchaLoad', () => {
      describe('When ReCAPTCHA not loaded', () => {
        it('Throw error', () => {
          expect(() => {
            ins.assertRecaptchaLoad()
          }).toThrow()
        })
      })

      describe('When ReCAPTCHA loaded', () => {
        it('Not throw error', () => {
          ins.setRecaptcha(recaptchaMock)

          expect(() => {
            ins.assertRecaptchaLoad()
          }).not.toThrow()
        })
      })
    })

    describe('#checkRecaptchaLoad', () => {
      describe('When Recaptcha not loaded', () => {
        it('Not load Recaptcha into it', () => {
          ins.checkRecaptchaLoad()
          expect(() => {
            ins.assertRecaptchaLoad()
          }).toThrow()
        })
      })

      describe('When Recaptcha loaded', () => {
        beforeEach(() => {
          window.grecaptcha = recaptchaMock
        })
        afterEach(() => delete window.grecaptcha)

        it('Load Recaptcha', () => {
          ins.checkRecaptchaLoad()

          expect(() => {
            ins.assertRecaptchaLoad()
          }).not.toThrow()
        })
      })
    })

    describe('#getRecaptcha', () => {
      describe('Recaptcha not loaded', () => {
        it('Return defered object', () => {
          const spy = jest.fn()
          // Since it return thenable, not Promise. Here must wrap it as Promise
          const promise = Promise.resolve(ins.getRecaptcha()).then(spy)
          expect(spy).not.toHaveBeenCalled()
          ins.setRecaptcha(recaptchaMock)
          return promise.then(() => {
            expect(spy).toHaveBeenCalled()
          })
        })
      })
    })

    describe('#setRecaptcha', () => {
      it('Set recaptcha', () => {
        ins.setRecaptcha(recaptchaMock)
        return Promise.resolve(ins.getRecaptcha()).then((recap) => {
          expect(recap).toBe(recaptchaMock)
        })
      })
    })

    describe('#render', () => {
      it('Render ReCAPTCHA', () => {
        const ele = document.createElement('div')
        const sitekey = 'foo'

        ins.setRecaptcha(recaptchaMock)

        return ins.render(ele, {sitekey}, (widgetId) => {
          expect(recaptchaMock.render).toBeCalled()
          expect(widgetId).toBe(WIDGET_ID)
        })
      })
    })

    describe('#reset', () => {
      describe('When pass widget id', () => {
        it('Reset ReCAPTCHA', () => {
          ins.reset(WIDGET_ID)

          expect(recaptchaMock.reset).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.reset()

          expect(recaptchaMock.reset).not.toBeCalled()
        })
      })

      beforeEach(() => {
        jest.resetAllMocks()
        ins.setRecaptcha(recaptchaMock)
      })
    })

    describe('#execute', () => {
      describe('When pass widget id', () => {
        it('Execute ReCAPTCHA', () => {
          ins.execute(WIDGET_ID)

          expect(recaptchaMock.execute).toBeCalled()
        })
      })

      describe('When not pass widget id', () => {
        it('Do nothing', () => {
          ins.execute()

          expect(recaptchaMock.execute).not.toBeCalled()
        })
      })

      beforeEach(() => {
        jest.resetAllMocks()
        ins.setRecaptcha(recaptchaMock)
      })
    })
  })

  describe('window.vueRecaptchaApiLoaded', () => {
    beforeEach(() => {
      window.grecaptcha = recaptchaMock
    })
    afterEach(() => delete window.grecaptcha)

    it('Load grecaptcha', () => {
      window.vueRecaptchaApiLoaded()
      expect(() => recaptcha.assertRecaptchaLoad()).not.toThrow()
    })
  })
})
