import redirectComponent from './redirectComponent'
import {clearError, errorCodeSelector} from 'redux/modules/app'

const shouldRedirectPath = ({errorCode}) =>
  errorCode === 404 ? '/page-not-found' : null

export const redirectNotFound = redirectComponent(
  'RedirectNotFound',
  state => ({errorCode: errorCodeSelector(state)}),
  shouldRedirectPath,
  {
    actions: {clearError},
    cleanUp: ({clearError}) => clearError(),
    omitProps: ['errorCode', 'clearError']
  }
)

export default redirectNotFound
