import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'glamor'

import Column from './Column'
import Checkbox from 'material-ui/Checkbox'
import {rowStyle} from './styles'

class Row extends Component {
  handleCheck = () => {
    const {id, onSelect, selectable} = this.props
    if (selectable && onSelect) {
      onSelect(id, !this.props.selected)
    }
  }

  renderCheckbox () {
    return <Checkbox checked={this.props.selected} onCheck={this.handleCheck} />
  }

  renderCheckboxColumn () {
    return (
      <Column>
        {this.renderCheckbox()}
      </Column>
    )
  }

  render () {
    const {selected, selectable, children, id, ...rest} = this.props
    const style = {
      '& td': {
        cursor: selectable ? 'pointer' : null,
        backgroundColor: selected ? 'hsl(0, 0%, 87.8%)' : 'inherit'
      }
    }

    return (
      <tr onClick={this.handleCheck} {...css(baseStyle, style)} {...rest}>
        {selectable && this.renderCheckboxColumn()}
        {children}
      </tr>
    )
  }

  static propTypes = {
    id: PropTypes.any,
    selectable: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    children: PropTypes.node,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    selectable: true,
    selected: false
  }
}

const baseStyle = css(rowStyle, {
  ':hover': {
    '& td': {
      backgroundColor: 'hsl(0, 0%, 96%)'
    }
  }
})

export default Row
