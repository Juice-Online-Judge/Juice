import * as app from 'redux/modules/app';

describe('(Redux) app', () => {
  describe('(Action Creators) actions', () => {
    it('Create action to set status', () => {
      expect(app.setStatus('foo')).to.deep.equal({
        type: app.SET_STATUS,
        payload: 'foo'
      });
    });

    it('Create action to clear status', () => {
      expect(app.clearStatus()).to.deep.equal({
        type: app.CLEAR_STATUS,
        payload: undefined
      });
    });

    it('Create action to set error', () => {
      expect(app.setError('foo')).to.deep.equal({
        type: app.SET_ERROR,
        payload: 'foo'
      });
    });

    it('Create action to clear error', () => {
      expect(app.clearError()).to.deep.equal({
        type: app.CLEAR_ERROR,
        payload: undefined
      });
    });
  });
});
