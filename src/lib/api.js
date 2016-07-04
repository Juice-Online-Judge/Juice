import rest from 'rest'
import pathPrefix from 'rest/interceptor/pathPrefix'
import mime from 'rest/interceptor/mime'
import errorCode from 'rest/interceptor/errorCode'
import template from 'rest/interceptor/template'
import jwtAuth from './interceptors/jwt-auth'
import headers from './interceptors/headers'

const api = rest
  .wrap(pathPrefix, { prefix: '/api' })
  .wrap(mime, {
    mime: 'application/json',
    accept: API_HEADER
  })
  .wrap(template)
  .wrap(jwtAuth)
  .wrap(headers)
  .wrap(errorCode)

export default api
