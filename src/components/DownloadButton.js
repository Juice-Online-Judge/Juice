import React, {Component} from 'react'

import PropTypes from 'prop-types'

import FlatButton from 'material-ui/FlatButton'

export class DownloadButton extends Component {
  componentDidMount() {
    const {text, disabled} = this.props
    if (!disabled && text) {
      this.createURL(text)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.text &&
      !nextProps.disabled &&
      this.props.text !== nextProps.text
    ) {
      this.revokeURL()
      this.createURL(nextProps.text)
    }
  }

  componentWillUnmount() {
    this.revokeURL()
  }

  createURL(text) {
    const blob = new Blob([text], {type: 'text/plain'})
    const url = URL.createObjectURL(blob)
    this.setState({
      url
    })
  }

  revokeURL() {
    const {url} = this.state
    if (url) {
      URL.revokeObjectURL(url)
      this.setState({
        url: null
      })
    }
  }

  render() {
    const {label, filename} = this.props
    const {url} = this.state
    if (!url) {
      return <FlatButton label={ label } disabled />
    }

    return (
      <FlatButton href={ url } label={ label } download={ filename || 'download' } />
    )
  }

  state = {
    url: null
  };

  static propTypes = {
    text: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    filename: PropTypes.string
  };
}

export default DownloadButton
