import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bind} from 'decko'

import {Link} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

class PageButton extends Component {
  @bind handleTouchTap() {
    const {disabled, onTouchTap} = this.props
    if (!disabled && onTouchTap) {
      onTouchTap(this.props.page)
    }
  }

  render() {
    const {
      baseUrl,
      page,
      label,
      disabled,
      ...props
    } = this.props
    const text = label || page
    if (baseUrl && !disabled) {
      return (
        <Link to={ `${baseUrl}?page=${page}` }>
          <FlatButton
            { ...props }
            label={ text }
            disabled={ disabled }
            onTouchTap={ this.handleTouchTap } />
        </Link>
      )
    } else {
      return (
        <FlatButton
          { ...props }
          label={ text }
          disabled={ disabled }
          onTouchTap={ this.handleTouchTap } />
      )
    }
  }

  static propTypes = {
    baseUrl: PropTypes.string,
    page: PropTypes.number.isRequired,
    onTouchTap: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool
  };
}

export default PageButton
