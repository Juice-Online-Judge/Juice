import store from 'store'
import jwtAuth from '../jwt-auth'

const createRequest = () => ({
  headers: {}
})

const TOKEN = 'TOKEN'

describe('(Interceptor) jwt-auth', () => {
  describe('When have token', () => {
    it('Add header', () => {
      const req = createRequest()
      jwtAuth(req)
      expect(req.headers['Authorization']).toBe(`Bearer ${TOKEN}`)
    })

    beforeEach(() => {
      store.set('juice-token', TOKEN)
    })

    afterEach(() => {
      store.clearAll()
    })
  })

  describe('When no token', () => {
    it('Not add header', () => {
      const req = createRequest()
      jwtAuth(req)
      expect(req.headers['Authorization']).toBeUndefined()
    })
  })
})
