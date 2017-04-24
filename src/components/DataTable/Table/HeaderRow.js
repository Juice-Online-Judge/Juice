import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'glamor'

import HeaderColumn from './HeaderColumn'
import Checkbox from 'material-ui/Checkbox'

class HeaderRow extends Component {
  handleCheck = (_event, selected) => {
    const {onSelectAll} = this.props
    this.setState({
      selected
    })
    if (onSelectAll) {
      onSelectAll(selected)
    }
  }

  renderCheckbox () {
    return <Checkbox onCheck={this.handleCheck} />
  }

  renderCheckboxColumn () {
    return (
      <HeaderColumn>
        {this.renderCheckbox()}
      </HeaderColumn>
    )
  }

  render () {
    const {displaySelectAll, children, ...rest} = this.props
    const {selected} = this.state
    const style = {
      backgroundColor: selected ? 'hsl(0, 0, 87.8%)' : 'inherit'
    }

    return (
      <tr {...css(baseStyle, style)} {...rest}>
        {displaySelectAll && this.renderCheckboxColumn()}
        {children}
      </tr>
    )
  }

  state = {
    selected: false
  }

  static propTypes = {
    displaySelectAll: PropTypes.bool.isRequired,
    children: PropTypes.node,
    onSelectAll: PropTypes.func
  }

  static defaultProps = {
    displaySelectAll: false
  }
}

const baseStyle = css({
  borderBottom: '1px solid hsl(0, 0%, 88%)',
  color: 'hsla(0, 0%, 0%, .88)',
  height: '48px'
})

export default HeaderRow
