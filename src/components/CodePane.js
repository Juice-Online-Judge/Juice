import React, { Component, PropTypes } from 'react';
import { PrismCode } from 'react-prism';

class CodePane extends Component {
  render() {
    const code = this.props.code || this.props.children || '';
    const { lang } = this.props;
    return (
      <pre>
        <PrismCode className={ `language-${lang}` }>
          { code }
        </PrismCode>
      </pre>
    );
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

export default CodePane;
