import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import TextField from 'material-ui/TextField';

export class RestrictionTab extends Component {
  componentDidMount() {
    this.handleChange();
  }

  @autobind
  handleFileChange(event) {
    this.handleChange({ file: event.target.value });
  }

  @autobind
  handleMemoryChange(event) {
    this.handleChange({ memory: event.target.value });
  }

  @autobind
  handleTimeChange(event) {
    this.handleChange({ time: event.target.value });
  }

  handleChange(data = {}) {
    // Fire change event
    this.setData(data);
    this.props.onChange({ restriction: this.data });
  }

  setData(data) {
    this.data = { ...this.data, ...data };
  }

  render() {
    return (
      <div>
        <div>
          <TextField floatingLabelText='Time limit' onChange={ this.handleTimeChange } />
        </div>
        <div>
          <TextField floatingLabelText='Memory limit' onChange={ this.handleMemoryChange } />
        </div>
        <div>
          <TextField floatingLabelText='File limit' onChange={ this.handleFileChange } />
        </div>
      </div>
    );
  }

  data = {
    time: null,
    file: null,
    memory: null
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
}

export default RestrictionTab;
