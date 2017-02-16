import Promise from 'any-promise'
import invariant from 'invariant'

const fakeResponse = []
const api = {}

api.request = jest.fn((request) => {
  let idx = null
  let res = null
  for (const [i, { url, error, data }] of fakeResponse.entries()) {
    if (url === request.url) {
      idx = i
      res = error ? Promise.reject({ status: error, data: {} }) : Promise.resolve({ data })
      break
    }
  }

  invariant(idx !== null, `No such response with path: ${request.path}`)
  fakeResponse.splice(idx, 1)
  return res
})

api.addFakeResponse = (fakeRes) => {
  fakeResponse.push(fakeRes)
}

api.clearFakeResponse = () => {
  fakeResponse.length = 0
}

export default api
