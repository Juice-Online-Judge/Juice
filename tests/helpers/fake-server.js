const isObject = (obj) => {
  return typeof obj === 'object';
};

class Respone {
  constructor(server, method, url) {
    this.server = server;
    this.url = url;
    this.method = method;
    this.statusCode = 200;
    this.headers = {};
    this.responeContent = '';
  }

  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  header(header) {
    Object.assign(this.headers, header);
    return this;
  }

  reply(respone) {
    if (isObject(respone)) {
      this.header({ 'Content-Type': 'application/json' });
      this.responeContent = JSON.stringify(respone);
    } else {
      this.responeContent = respone;
    }

    this.server.respondWith(this.method, this.url, [
      this.statusCode,
      this.headers,
      this.responeContent
    ]);
  }
}

class FakeServer {
  constructor() {
    this.server = sinon.fakeServer.create();
    this.server.autoRespond = true;
  }

  restore() {
    this.server.restore();
  }

  get(url) {
    return this.mock('GET', url);
  }

  post(url) {
    return this.mock('POST', url);
  }

  put(url) {
    return this.mock('PUT', url);
  }

  patch(url) {
    return this.mock('PATCH', url);
  }

  delete(url) {
    return this.mock('DELETE', url);
  }

  mock(method, url) {
    return new Respone(this.server, method, url);
  }
}

export default FakeServer;
