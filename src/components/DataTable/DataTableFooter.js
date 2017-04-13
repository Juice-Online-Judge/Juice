import React, {Component} from 'react'
import PropTypes from 'prop-types'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import NavigateRight from 'material-ui/svg-icons/image/navigate-next'
import NavigateLeft from 'material-ui/svg-icons/image/navigate-before'

import Row from './Table/Row'
import Column from './Table/Column'

import {paginatedShape, pageInfoShape} from './prop-types'

class DataTableFooter extends Component {
  shouldShowMenu(defaultStyle) {
    if (this.props.paginated && typeof this.props.paginated === 'boolean') {
      return true
    }

    return !!this.props.paginated.menuOptions
  }

  handleRowSelection(obj) {
    const menuOptions = obj.menuOptions || [5, 10, 15]

    return menuOptions.map((num) => (
      <MenuItem
        value={ num }
        primaryText={ num }
        key={ num } />
    ))
  }

  render() {
    const {
      paginated,
      pageInfo,
      perPages,
      onNavigateLeft,
      onNavigateRight,
      onPerPageChange
    } = this.props
    return (
      <Row selectable={ false } >
        <Column
          style={ {
            textAlign: 'right',
            verticalAlign: 'middle',
            width: '70%'
          } }>
          {
            this.shouldShowMenu() && (
              <div>
                <span style={ {paddingRight: 15} }>
                  Rows per page:
                </span>
                <SelectField
                  value={ perPages }
                  style={ {width: 35, fontSize: 13, top: 0} }
                  onChange={ onPerPageChange }>
                  {this.handleRowSelection(paginated)}
                </SelectField>
              </div>
            )
          }
        </Column>

        <Column
          style={ rightAlign }>
          <span> { pageInfo.showing } </span>
        </Column>

        <Column
          style={ rightAlign }>
          <NavigateLeft
            onClick={ onNavigateLeft }
            style={ navigationStyle } />
          <NavigateRight
            onClick={ onNavigateRight }
            style={ navigationStyle } />
        </Column>
      </Row>
    )
  }

  static propTypes = {
    paginated: paginatedShape,
    pageInfo: pageInfoShape,
    perPages: PropTypes.number,
    onNavigateLeft: PropTypes.func.isRequired,
    onNavigateRight: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired
  };
}

export default DataTableFooter

const rightAlign = {
  textAlign: 'right',
  verticalAlign: 'middle'
}

const navigationStyle = {
  cursor: 'pointer'
}
