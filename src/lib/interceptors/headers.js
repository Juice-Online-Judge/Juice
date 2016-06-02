import interceptor from 'rest/interceptor';

const xhrHeader = interceptor({
  request(request) {
    request.headers = request.headers || {};
    request.headers['X-Requested-With'] = 'XMLHttpRequest';
    request.headers['Accept'] = API_HEADER;
    return request;
  }
});

export default xhrHeader;
