import invariant from 'invariant'
import defer from './defer'

export function createRecaptcha() {
  const deferred = defer()

  return {
    setRecaptcha(recap) {
      deferred.resolve(recap)
    },

    getRecaptcha() {
      return deferred.promise
    },

    render(ele, options, cb) {
      this.getRecaptcha().then(recap => {
        cb(recap.render(ele, options))
      })
    },

    reset(widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertRecaptchaLoad()
      this.getRecaptcha().then(recap => recap.reset(widgetId))
    },

    execute(widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertRecaptchaLoad()
      this.getRecaptcha().then(recap => recap.execute(widgetId))
    },

    checkRecaptchaLoad() {
      if (window.hasOwnProperty('grecaptcha')) {
        this.setRecaptcha(window.grecaptcha)
      }
    },

    assertRecaptchaLoad() {
      invariant(deferred.resolved(), 'ReCAPTCHA has not been loaded')
    }
  }
}

const recaptcha = createRecaptcha()

if (typeof window !== 'undefined') {
  window.onloadCallback = () => {
    recaptcha.setRecaptcha(window.grecaptcha)
  }
}

export default recaptcha
