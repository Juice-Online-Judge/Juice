import {Component} from 'react'

class Toast extends Component {
  render() {
    return null
  }

  static propTypes = {
    children: PropTypes.node,
    timeout: PropTypes.number.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    timeout: 3000
  };
}

export default Toast
