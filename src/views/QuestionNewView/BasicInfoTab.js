import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

export class BasicInfoTab extends Component {
  componentDidMount() {
    // Fire event to set default value
    this.handleChange();
  }

  @autobind
  handleUuidChange(event) {
    this.handleChange({ uuid: event.target.value });
  }

  @autobind
  handleTitleChange(event) {
    this.handleChange({ title: event.target.value });
  }

  @autobind
  handleDescChange(event) {
    this.handleChange({ description: event.target.value });
  }

  @autobind
  handlePublicChange(event) {
    this.handleChange({ public: event.target.checked });
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
          <TextField
            floatingLabelText='UUID (optional)'
            fullWidth
            onChange={ this.handleUuidChange } />
        </div>
        <div>
          <TextField
            floatingLabelText='Title'
            fullWidth
            onChange={ this.handleTitleChange } />
        </div>
        <div>
          <TextField
            floatingLabelText='Description'
            fullWidth
            multiLine
            onChange={ this.handleDescChange }
            rows={ 10 }/>
        </div>
        <div>
          <Toggle
            label='Public'
            labelPosition='right'
            defaultToggled
            onToggle={ this.handlePublicChange } />
        </div>
      </div>
    );
  }

  state = {
    uuid: null,
    title: null,
    description: null,
    public: true
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
}

export default BasicInfoTab;
