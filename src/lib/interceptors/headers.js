import interceptor from 'rest/interceptor'

const xhrHeader = interceptor({
  request(request) {
    request.headers = request.headers || {}
    request.headers['X-Requested-With'] = 'XMLHttpRequest'
    return request
  }
})

export default xhrHeader
