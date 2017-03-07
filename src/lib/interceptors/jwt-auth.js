import store from 'store'

const jwtAuth = (request) => {
  const token = store.get('juice-token')
  if (token !== undefined) {
    request.headers = request.headers || {}
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
}

export default jwtAuth
