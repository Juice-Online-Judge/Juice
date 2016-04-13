import React, { Component, PropTypes } from 'react';

import CenterLoading from './CenterLoading';

class LoadingContainer extends Component {
  render() {
    return (
      <div style={ styles.container }>
        <CenterLoading loading={ this.props.loading } />
        { this.props.children }
      </div>
    );
  }

  static propTypes = {
    children: PropTypes.node,
    loading: PropTypes.boolean
  }
}

export default LoadingContainer;

const styles = {
  container: {
    position: 'relative'
  }
};
