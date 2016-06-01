import isUndefined from 'lodash/isUndefined';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import { Redirect } from 'react-router';
function generateByConfig(config) {
  if (has(config, 'from')) {
    return generateRedirectWithPath(config.from, config.to);
  } else {
    return generateRedirect(config.to);
  }
}

function generateRedirect(to) {
  return Redirect.createRouteFromReactElement({
    type: {},
    props: {
      to
    }
  });
}

function generateRedirectWithPath(from, to) {
  return Redirect.createRouteFromReactElement({
    type: {},
    props: {
      from,
      to
    }
  });
}

function redirect(pathOrConfig, to) {
  if (isObject(pathOrConfig)) {
    return generateByConfig(pathOrConfig);
  } else if (isUndefined(to)) {
    return generateRedirect(pathOrConfig);
  } else {
    return generateRedirectWithPath(pathOrConfig, to);
  }
}

export default redirect;
