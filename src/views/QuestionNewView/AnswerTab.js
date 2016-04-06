import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import FileArea from 'components/FileArea';

export class AnswerTab extends Component {
  componentDidMount() {
    this.handleChange();
  }

  @autobind
  handleInputChange(content) {
    this.handleChange({ input: content });
  }

  @autobind
  handleOutputChange(content) {
    this.handleChange({ output: content });
  }

  handleChange(data = {}) {
    // Fire change event
    this.props.onChange({ ...this.state, ...data });
    this.setState(data);
  }

  render() {
    return (
      <div>
        <div>
          <FileArea onChange={ this.handleInputChange } />
        </div>
        <div>
          <FileArea onChange={ this.handleOutputChange } />
        </div>
      </div>
    );
  }

  state = {
    input: null,
    output: null
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
}

export default AnswerTab;
