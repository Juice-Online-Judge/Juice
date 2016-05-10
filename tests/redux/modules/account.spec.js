import reducer, * as account from 'redux/modules/account';

describe('(Redux) account', () => {
  describe('(Action Creator) #setLoginState', () => {
    it('Create "Set login state" action', () => {
      expect(account.setLoginState()).to.deep.equal({
        type: account.SET_LOGIN_STATE,
        payload: false
      });

      expect(account.setLoginState(true)).to.deep.equal({
        type: account.SET_LOGIN_STATE,
        payload: true
      });

      expect(account.setLoginState(false)).to.deep.equal({
        type: account.SET_LOGIN_STATE,
        payload: false
      });
    });
  });

  describe('(Action Creator) #setUserInfo', () => {
    it('Create "Set user info" action', () => {
      expect(account.setUserInfo({ foo: 'bar' })).to.deep.equal({
        type: account.SET_USER_INFO,
        payload: { foo: 'bar' }
      });
    });
  });

  describe('(Action Creator) #clearUser', () => {
    it('Create "Clear user" action', () => {
      expect(account.clearUser()).to.deep.equal({
        type: account.CLEAR_USER,
        payload: undefined
      });
    });
  });

  describe('(Reducer)', () => {
    it('Configure initialState correct', () => {
      expect(reducer(undefined, {})).to.equal(account.initialState);
    });
  });
});
