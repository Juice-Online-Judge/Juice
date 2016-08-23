import axios from 'axios'
import jwtAuth from './interceptors/jwt-auth'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': API_HEADER
  }
})

api.interceptors.request.use(jwtAuth)

export default api
