import localStore from 'store'
import reducer, * as account from 'redux/modules/account'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import api from 'lib/api'

jest.mock('lib/api')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('(Redux) account', () => {
  describe('(Action Creator) #setLoginState', () => {
    it('Create "Set login state" action', () => {
      expect(account.setLoginState()).toEqual({
        type: account.SET_LOGIN_STATE,
        payload: false
      })

      expect(account.setLoginState(true)).toEqual({
        type: account.SET_LOGIN_STATE,
        payload: true
      })

      expect(account.setLoginState(false)).toEqual({
        type: account.SET_LOGIN_STATE,
        payload: false
      })
    })
  })

  describe('(Action Creator) #setUserInfo', () => {
    it('Create "Set user info" action', () => {
      const info = {
        username: 'foo',
        roles: [{id: 1, name: 'admin'}]
      }

      expect(account.setUserInfo(info)).toEqual({
        type: account.SET_USER_INFO,
        payload: {
          username: 'foo',
          roles: ['admin']
        }
      })
    })
  })

  describe('(Action Creator) #clearUser', () => {
    it('Create "Clear user" action', () => {
      expect(account.clearUser()).toEqual({
        type: account.CLEAR_USER,
        payload: undefined
      })
    })
  })

  describe('(Async Action) #login', () => {
    describe('When success', () => {
      it('Will set token', () => {
        const store = mockStore({
          account: new account.Account()
        })
        api.addFakeResponse({
          url: 'auth/sign-in',
          data: 'token'
        })
        api.addFakeResponse({
          url: 'account/profile',
          data: {
            username: 'foo'
          }
        })

        return store.dispatch(account.login('user', 'pass')).then(result => {
          expect(result).toBe(true)
          expect(api.request.mock.calls[0][0].data).toEqual({
            username: 'user',
            password: 'pass'
          })
        })
      })
    })

    afterEach(() => {
      api.clearFakeResponse()
      localStore.clearAll()
    })
  })

  describe('(Reducer)', () => {
    it('Configure initialState correct', () => {
      expect(reducer(undefined, {type: 'foo'})).toBe(account.initialState)
    })

    it('Handle SET_LOGIN_STATE', () => {
      expect(
        reducer(account.initialState, {
          type: account.SET_LOGIN_STATE,
          payload: true
        })
      ).toEqualImmutable(new account.Account({valid: true, state: true}))

      expect(
        reducer(account.initialState, {
          type: account.SET_LOGIN_STATE,
          payload: false
        })
      ).toEqualImmutable(new account.Account({valid: true, state: false}))
    })
  })
})
