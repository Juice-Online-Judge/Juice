import redirectComponent from './redirectComponent'
import invoke from 'lodash/fp/invoke'
import { clearError, errorCodeSelector } from 'redux/modules/app'

const shouldRedirect = ({ errorCode }) => errorCode === 401

export const redirectNotAuth = redirectComponent({
  name: 'RedirectNotAuth',
  mapStateToProp: state => ({ errorCode: errorCodeSelector(state) }),
  shouldRedirect,
  redirectPath: '/sign-in',
  actions: { clearError },
  cleanUp: invoke('clearError'),
  omitProps: ['errorCode', 'clearError']
})

export default redirectNotAuth
