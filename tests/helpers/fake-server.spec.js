import FakeServer from './fake-server';
import api from 'lib/api';

describe('(Helper) FakeServer', () => {
  let server;

  it('Respond get request', () => {
    const body = { foo: 'bar' };
    server
      .get('/api/v1/foo')
      .reply(body);
    return expect(api({
      path: 'foo'
    }).entity()).to.eventually.deep.equal(body);
  });

  it('Respond post request', () => {
    const body = { foo: 'bar' };
    server
      .post('/api/v1/foo')
      .reply(body);
    return expect(api({
      method: 'POST',
      path: 'foo',
      entity: body
    }).entity()).to.eventually.deep.equal(body);
  });

  it('Respond patch request', () => {
    const body = { foo: 'bar' };
    server
      .patch('/api/v1/foo')
      .reply(body);

    return expect(api({
      method: 'PATCH',
      path: 'foo',
      entity: body
    }).entity()).to.eventually.deep.equal(body);
  });

  it('Respond put request', () => {
    const body = { foo: 'bar' };
    server
      .put('/api/v1/foo')
      .reply(body);

    return expect(api({
      method: 'PUT',
      path: 'foo',
      entity: body
    }).entity()).to.eventually.deep.equal(body);
  });

  it('Respond delete request', () => {
    const body = { foo: 'bar' };
    server
      .delete('/api/v1/foo')
      .reply(body);

    return expect(api({
      method: 'DELETE',
      path: 'foo',
      entity: body
    }).entity()).to.eventually.deep.equal(body);
  });

  describe('Respone', () => {
    it('Allow set status', () => {
      server
        .get('/api/v1/foo')
        .status(201)
        .reply({});

      return expect(api({
        path: 'foo'
      })).to.eventually.have.deep.property('status.code', 201);
    });
  });

  beforeEach(() => {
    server = new FakeServer();
  });

  afterEach(() => {
    server.restore();
  });
});
