import pTap from 'p-tap'

const defer = () => {
  let state = false
  const deferred = {
    resolved() {
      return state
    }
  }

  deferred.promise = new Promise(resolve => {
    deferred.resolve = resolve
  }).then(
    pTap(() => {
      state = true
    })
  )

  return deferred
}

export default defer
