import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import TextField from 'material-ui/TextField';

export class BasicInfoTab extends Component {
  @autobind
  handleNameChange(event) {
    this.handleChange({ name: event.target.value });
  }

  handleChange(data = {}) {
    // Fire change event
    this.props.onChange({ ...this.state, ...data });
    this.setState(data);
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText='Name'
          fullWidth
          onChange={ this.handleNameChange } />
      </div>
    );
  }

  state = {
    name: null
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
}

export default BasicInfoTab;
