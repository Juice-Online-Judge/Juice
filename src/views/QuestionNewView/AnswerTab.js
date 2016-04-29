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
    this.setData(data);
    this.props.onChange(this.data);
  }

  setData(data) {
    this.data = { ...this.data, ...data };
  }

  render() {
    return (
      <div>
        <div>
          <FileArea multiple onChange={ this.handleInputChange } />
        </div>
        <div>
          <FileArea multiple onChange={ this.handleOutputChange } />
        </div>
      </div>
    );
  }

  data = {
    input: null,
    output: null
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
}

export default AnswerTab;
