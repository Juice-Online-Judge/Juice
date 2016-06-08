import localStore from 'store'
import reducer, * as account from 'redux/modules/account'
import mockStore from '../../helpers/mock-store'
import FakeServer from '../../helpers/fake-server'

describe('(Redux) account', () => {
  describe('(Action Creator) #setLoginState', () => {
    it('Create "Set login state" action', () => {
      expect(account.setLoginState()).to.deep.equal({
        type: account.SET_LOGIN_STATE,
        payload: false
      })

      expect(account.setLoginState(true)).to.deep.equal({
        type: account.SET_LOGIN_STATE,
        payload: true
      })

      expect(account.setLoginState(false)).to.deep.equal({
        type: account.SET_LOGIN_STATE,
        payload: false
      })
    })
  })

  describe('(Action Creator) #setUserInfo', () => {
    it('Create "Set user info" action', () => {
      expect(account.setUserInfo({ foo: 'bar' })).to.deep.equal({
        type: account.SET_USER_INFO,
        payload: { foo: 'bar' }
      })
    })
  })

  describe('(Action Creator) #clearUser', () => {
    it('Create "Clear user" action', () => {
      expect(account.clearUser()).to.deep.equal({
        type: account.CLEAR_USER,
        payload: undefined
      })
    })
  })

  describe('(Async Action) #login', () => {
    var server

    context('When success', () => {
      it('Will set token', () => {
        const store = mockStore({
          account: new account.AccountState()
        })
        server.post('/api/v1/auth/sign-in').reply('token')
        server.get('/api/v1/account/profile').reply({ username: 'foo' })

        return store.dispatch(account.login('user', 'pass')).then((result) => {
          expect(result).to.be.true
          expect(server.requests()[0].requestBody).to.equal('{"username":"user","password":"pass"}')
          expect(localStore.get('juice-token')).to.equal('token')
        })
      })
    })

    beforeEach(() => {
      server = new FakeServer()
    })
    afterEach(() => {
      server.restore()
      localStore.clear()
    })
  })

  describe('(Reducer)', () => {
    it('Configure initialState correct', () => {
      expect(reducer(undefined, {})).to.equal(account.initialState)
    })

    it('Handle SET_LOGIN_STATE', () => {
      expect(reducer(account.initialState, {
        type: account.SET_LOGIN_STATE,
        payload: true
      })).to.equal(new account.AccountState({ valid: true, state: true }))

      expect(reducer(account.initialState, {
        type: account.SET_LOGIN_STATE,
        payload: false
      })).to.equal(new account.AccountState({ valid: true, state: false }))
    })
  })
})
