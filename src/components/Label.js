import React, { Component, PropTypes } from 'react';

export class Label extends Component {
  render() {
    const label = this.props.label || this.props.children;
    return (
      <label style={ styles.label }>
        { label }
      </label>
    );
  }

  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.node
  };
}

export default Label;

const styles = {
  label: {
    marginBottom: '5px'
  }
};
