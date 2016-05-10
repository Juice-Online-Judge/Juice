import store from 'store';

describe('(Vendor) store', () => {
  describe('#set', () => {
    it('Set value in localStorage', () => {
      store.set('foo', 'bar');
      expect(localStorage.getItem('foo')).to.equal('"bar"');
    });
  });

  describe('#get', () => {
    context('When key exist', () => {
      it('Get value in localStorage', () => {
        localStorage.setItem('foo', '"bar"')
        expect(store.get('foo')).to.equal('bar');
      });
    });

    context('When key not exist', () => {
      it('Return undefined', () => {
        expect(store.get('foo')).to.be.undefined;
      });
    });
  });

  beforeEach(() => localStorage.clear());
});
