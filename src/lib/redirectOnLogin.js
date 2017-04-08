import redirectComponent from './redirectComponent'
import {isLoginSelector} from 'redux/modules/account'

export const redirectOnLogin = redirectComponent(
  'RedirectOnLogin',
  state => ({isLogin: isLoginSelector(state)}),
  ({isLogin}) => isLogin ? '/' : null,
  {
    omitProps: 'isLogin'
  }
)

export default redirectOnLogin
