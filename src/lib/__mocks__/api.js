import Promise from 'bluebird'
import invariant from 'invariant'

const fakeResponse = []

const api = jest.fn((request) => {
  let idx = null
  let res = null
  for (const [i, { path, error, entity }] of fakeResponse.entries()) {
    if (path === request.path) {
      idx = i
      res = error ? Promise.reject({ status: error, entity: {} }) : Promise.resolve({ entity })
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
