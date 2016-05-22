import React, { Component, PropTypes } from 'react';
import { bind } from 'decko';

import FileArea from 'components/FileArea';

export class AnswerTab extends Component {
  componentDidMount() {
    this.handleChange();
  }

  @bind
  handleInputChange(content) {
    this.handleChange({ input: content });
  }

  @bind
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
