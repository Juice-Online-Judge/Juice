import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import MenuItem from 'material-ui/MenuItem'

function MenuLinkItem ({to, ...rest}) {
  return <MenuItem containerElement={<Link to={to} />} {...rest} />
}

MenuLinkItem.propTypes = {
  to: PropTypes.string.isRequired
}

export default MenuLinkItem
