import redirectComponent from './redirectComponent'
import get from 'lodash/fp/get'
import { isNotAdminSelector } from 'redux/modules/account'

const redirectNotAdmin = redirectComponent({
  name: 'RedirectNotAdmin',
  mapStateToProp: state => ({ isNotAdmin: isNotAdminSelector(state) }),
  shouldRedirect: get('isNotAdmin'),
  redirectPath: '/permission-denied',
  omitProps: 'isNotAdmin'
})

export default redirectNotAdmin
