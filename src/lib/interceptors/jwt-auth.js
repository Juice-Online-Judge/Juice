import store from 'store'

const jwtAuth = (request) => {
  if (store.has('juice-token')) {
    const token = store.get('juice-token')
    request.headers = request.headers || {}
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
}

export default jwtAuth
