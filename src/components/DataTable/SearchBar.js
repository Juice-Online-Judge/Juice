import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import SearchIcon from 'material-ui/svg-icons/action/search'

import HeaderRow from './Table/HeaderRow'
import HeaderColumn from './Table/HeaderColumn'

class SearchBar extends Component {
  toggleSearch = () => {
    const searchStyle = {...this.state.searchStyle}
    const iconStyle = {...this.state.iconStyle}
    const {disabled} = this.state
    if (!this.props.search) {
      return
    }

    searchStyle.opacity = this.toggleOpacity(searchStyle.opacity)
    iconStyle.opacity = this.toggleOpacity(iconStyle.opacity)

    this.setState({
      searchStyle,
      iconStyle,
      disabled: !disabled
    })
  }

  toggleOpacity(val) {
    return val === 0 ? 1 : 0
  }

  render() {
    const {onChange, columnLength, onSelectAll} = this.props
    const {iconStyle, searchStyle, disabled} = this.state
    return (
      <HeaderRow>
        <HeaderColumn
          colSpan={ columnLength }
          style={ searchHeaderColumnStyle }>
          <SearchIcon style={ iconStyle } />
          <input
            type='search'
            placeholder='Search'
            style={ searchStyle }
            disabled={ disabled }
            onChange={ onChange } />
          <FilterList
            style={ iconStyleFilter }
            onClick={ this.toggleSearch } />
          <FlatButton onClick={ onSelectAll } primary>Select All</FlatButton>
        </HeaderColumn>
      </HeaderRow>
    )
  }

  state = {
    disabled: true,
    searchStyle,
    iconStyle
  }

  static propTypes = {
    search: PropTypes.bool.isRequired,
    columnLength: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired
  }

  static defaultProps = {
    search: false
  }
}

export default SearchBar

const iconStyleFilter = {
  color: '#757575',
  cursor: 'pointer',
  transform: 'translateY(5px) translateX(-20px)'
}

const searchHeaderColumnStyle = {
  position: 'relative',
  textAlign: 'right'
}

const searchStyle = {
  color: '#777777',
  opacity: 0,
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
}

const iconStyle = {
  color: '#757575',
  position: 'absolute',
  top: '30%',
  opacity: 0,
  marginLeft: -76
}
