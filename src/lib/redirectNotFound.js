import redirectComponent from './redirectComponent'
import invoke from 'lodash/fp/invoke'
import { clearError, errorCodeSelector } from 'redux/modules/app'

const shouldRedirect = ({ errorCode }) => errorCode === 404

export const redirectNotFound = redirectComponent({
  name: 'RedirectNotFound',
  mapStateToProp: state => ({ errorCode: errorCodeSelector(state) }),
  shouldRedirect,
  redirectPath: '/page-not-found',
  actions: { clearError },
  cleanUp: invoke('clearError'),
  omitProps: ['errorCode', 'clearError']
})

export default redirectNotFound
