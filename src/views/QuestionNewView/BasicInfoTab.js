import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MarkdownEditor from 'components/MarkdownEditor';

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
  handleDescChange(text) {
    this.handleChange({ description: text });
  }

  @autobind
  handlePublicChange(event) {
    this.handleChange({ public: event.target.checked });
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
          <MarkdownEditor
            onChange={ this.handleDescChange } />
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

  data = {
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
