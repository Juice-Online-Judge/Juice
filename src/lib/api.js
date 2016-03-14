import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import csrf from 'rest/interceptor/csrf';
import Cookie from 'js-cookie';

const api = rest
  .wrap(pathPrefix, { prefix: '/api/v1' })
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode)
  .wrap(csrf, { token: Cookie.get('csrf-token') });

export default api;
