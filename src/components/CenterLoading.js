import React, { PropTypes } from 'react';

import RefreshIndicator from 'material-ui/lib/refresh-indicator';

export const CenterLoading = (props) => {
  const { loading } = props;
  const status = loading ? 'loading' : 'hide';
  return (
    <div style={ styles.flexContainer }>
      <RefreshIndicator status={ status } left={ window.innerWidth / 2 - 20 } top={ 10 } />
    </div>
  );

  static propTypes = {
    loading: PropTypes.bool
  }
};

export default CenterLoading;

const styles = {
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
