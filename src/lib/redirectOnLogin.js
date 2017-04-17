import redirectComponent from './redirectComponent'
import get from 'lodash/fp/get'
import { isLoginSelector } from 'redux/modules/account'

export const redirectOnLogin = redirectComponent({
  name: 'RedirectOnLogin',
  mapStateToProp: state => ({ isLogin: isLoginSelector(state) }),
  shouldRedirect: get('isLogin'),
  redirectPath: '/',
  omitProps: 'isLogin'
})

export default redirectOnLogin
