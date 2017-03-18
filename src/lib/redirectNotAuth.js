import redirectComponent from './redirectComponent'
import { clearError, errorCodeSelector } from 'redux/modules/app'

const shouldRedirectPath = ({ errorCode }) =>
  errorCode === 401 ? '/sign-in' : null

export const redirectNotAuth = redirectComponent(
  'RedirectNotAuth',
  state => ({ errorCode: errorCodeSelector(state) }),
  shouldRedirectPath,
  {
    actions: { clearError },
    cleanUp: ({ clearError }) => clearError(),
    omitProps: ['errorCode', 'clearError']
  }
)

export default redirectNotAuth
