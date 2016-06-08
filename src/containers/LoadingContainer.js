import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import CenterLoading from 'components/CenterLoading'
import { isPendingSelector } from 'redux/modules/app'

class LoadingContainer extends Component {
  componentDidMount() {
    this.setState({
      left: this.refs.container.offsetWidth / 2 - 20
    })
  }

  render() {
    const { pending, children } = this.props
    return (
      <div ref='container' style={ styles.container }>
        <CenterLoading left={ this.state.left } loading={ pending } />
        { children }
      </div>
    )
  }

  state = {
    left: window.innerWidth / 2 - 20
  };

  static propTypes = {
    children: PropTypes.node,
    pending: PropTypes.bool.isRequired
  };
}

export default connect((state) => ({ pending: isPendingSelector(state) }))(LoadingContainer)

const styles = {
  container: {
    position: 'relative'
  }
}
