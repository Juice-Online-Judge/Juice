import React, { PropTypes, Component } from 'react';

class ToggleDisplay extends Component {
  render() {
    const { show, hide, children } = this.props;
    const style = show || !hide ? null : styles.zeroHeight;
    return (
      <div style={ style }>
        { children }
      </div>
    );
  }

  static propTypes = {
    show: PropTypes.bool,
    hide: PropTypes.bool,
    children: PropTypes.node
  };
}

export default ToggleDisplay;

const styles = {
  zeroHeight: {
    height: '0px',
    overflow: 'hidden'
  }
};
