import React, { Component, PropTypes } from 'react'
import Highlight from 'react-highlight'
import pure from 'recompose/pure'

export class CodePane extends Component {
  render() {
    const code = this.props.code || this.props.children || ''
    const { lang } = this.props
    const className = `language-${lang}`
    return (
      <Highlight className={ className } >
        { code }
      </Highlight>
    )
  }

  static propTypes = {
    lang: PropTypes.oneOf(['c', 'cpp', 'txt']),
    code: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    lang: 'c'
  };
}

export default pure(CodePane)
