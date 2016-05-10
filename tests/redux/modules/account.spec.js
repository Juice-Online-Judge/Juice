import reducer, * as account from 'redux/modules/account';

describe('(Redux) account', () => {
  describe('(Reducer)', () => {
    it('Configure initialState correct', () => {
      expect(reducer(undefined, {})).to.equal(account.initialState);
    });
  });
});
