import redirectComponent from './redirectComponent'
import {isNotAdminSelector} from 'redux/modules/account'

const redirectNotAdmin = redirectComponent(
  'RedirectNotAdmin',
  state => ({isNotAdmin: isNotAdminSelector(state)}),
  ({isNotAdmin}) => (isNotAdmin ? '/permission-denied' : null),
  {
    omitProps: 'isNotAdmin'
  }
)

export default redirectNotAdmin
