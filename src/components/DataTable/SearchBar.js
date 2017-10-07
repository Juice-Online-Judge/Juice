import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import FlatButton from 'material-ui/FlatButton'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import SearchIcon from 'material-ui/svg-icons/action/search'

import HeaderRow from './Table/HeaderRow'
import HeaderColumn from './Table/HeaderColumn'

class SearchBar extends Component {
  toggleSearch = () => {
    const { searchEnable } = this.state

    if (!this.props.search) {
      return
    }

    this.setState({
      searchEnable: !searchEnable
    })
  }

  render () {
    const { onChange, onSelectAllMatch, columnLength } = this.props
    const { searchEnable } = this.state
    return (
      <HeaderRow>
        <HeaderColumn colSpan={columnLength} {...searchHeaderColumnStyle}>
          <SearchIcon />
          <input
            type='search'
            placeholder='Search'
            {...css(searchStyle, { opacity: searchEnable ? 1 : 0 })}
            disabled={!searchEnable}
            onChange={onChange} />
          <FilterList
            {...css(iconStyleFilter, { opacity: searchEnable ? 0 : 1 })}
            onClick={this.toggleSearch} />
          <FlatButton
            disabled={!searchEnable}
            primary
            onClick={onSelectAllMatch}
            label='Select all match' />
        </HeaderColumn>
      </HeaderRow>
    )
  }

  state = {
    searchEnable: false
  }

  static propTypes = {
    search: PropTypes.bool.isRequired,
    columnLength: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelectAllMatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    search: false
  }
}

export default SearchBar

const iconStyleFilter = css({
  color: '#757575',
  cursor: 'pointer',
  transform: 'translateY(5px) translateX(-20px)'
})

const searchHeaderColumnStyle = css({
  position: 'relative',
  textAlign: 'right'
})

const searchStyle = css({
  color: '#777777',
  transitionDuration: '0.6s',
  transitionProperty: 'opacity',
  border: 0,
  outline: 0,
  fontSize: 16,
  width: '100%',
  marginLeft: -22,
  padding: '7px 12px',
  textIndent: 3,
  cursor: 'text'
})
