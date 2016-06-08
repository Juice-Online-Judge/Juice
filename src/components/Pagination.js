import React, { Component, PropTypes } from 'react'
import { bind } from 'decko'
import times from 'lodash/times'

import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'

import CenterBlock from 'layouts/CenterBlock'

export class Pagination extends Component {
  get prevButton() {
    const { baseUrl, current } = this.props

    return (
      <PageButton
        baseUrl={ baseUrl }
        page={ current - 1 }
        disabled={ current === 1 }
        label='Prev'
        onTouchTap={ this.props.onChange } />
    )
  }

  get nextButton() {
    const { baseUrl, current, maxPage } = this.props

    return (
      <PageButton
        baseUrl={ baseUrl }
        page={ current + 1 }
        disabled={ current === maxPage }
        label='Next'
        onTouchTap={ this.props.onChange } />
    )
  }

  get pagination() {
    const { baseUrl, current, maxPage } = this.props
    var min = current - 4
    var max
    // Calculate min page
    min = Math.max(min, 1)
    // Calculate max page
    max = Math.min(min + 9, maxPage)

    if (max - min < 9) { // If not enough for 10 page
      // Modify min page
      min = Math.max(1, max - 9)
    }

    return times(max - min + 1, (i) => {
      const page = min + i
      return (
        <PageButton
          key={ i }
          baseUrl={ baseUrl }
          primary={ page === current }
          style={ styles.page }
          labelStyle={ styles.noPadding }
          page={ page }
          onTouchTap={ this.props.onChange } />
      )
    })
  }

  render() {
    const { prevButton, pagination, nextButton } = this
    return (
      <CenterBlock fullwidth>
        { prevButton }
        { pagination }
        { nextButton }
      </CenterBlock>
    )
  }

  static propTypes = {
    baseUrl: PropTypes.string,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    maxPage: PropTypes.number.isRequired
  };
}

export default Pagination

class PageButton extends Component {
  @bind
  handleTouchTap() {
    const { disabled, onTouchTap } = this.props
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

const styles = {
  page: {
    maxWidth: '34px',
    minWidth: '34px'
  },
  noPadding: {
    padding: '0'
  }
}
