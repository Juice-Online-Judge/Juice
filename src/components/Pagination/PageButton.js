import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

class PageButton extends Component {
  handleClick = () => {
    const { disabled, onClick } = this.props
    if (!disabled && onClick) {
      onClick(this.props.page)
    }
  }

  render () {
    const { baseUrl, page, label, disabled, ...props } = this.props
    const text = label || page
    if (baseUrl && !disabled) {
      return (
        <Link to={`${baseUrl}?page=${page}`}>
          <FlatButton
            {...props}
            label={text}
            disabled={disabled}
            onClick={this.handleClick} />
        </Link>
      )
    } else {
      return (
        <FlatButton
          {...props}
          label={text}
          disabled={disabled}
          onClick={this.handleClick} />
      )
    }
  }

  static propTypes = {
    baseUrl: PropTypes.string,
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool
  }
}

export default PageButton
