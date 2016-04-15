import React, { Component, PropTypes } from 'react';
import times from 'lodash/times';

import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import CenterBlock from 'layouts/CenterBlock';

export class Pagination extends Component {
  get prevButton() {
    const { baseUrl, current } = this.props;

    if (current !== 1) {
      return (
        <Link to={ `${baseUrl}?page=${current - 1}` }>
          <FlatButton label='Prev' />
        </Link>
      );
    } else {
      return (
        <FlatButton label='Prev' disabled />
      );
    }
  }

  get nextButton() {
    const { baseUrl, current, maxPage } = this.props;

    if (current !== maxPage) {
      return (
        <Link to={ `${baseUrl}?page=${current + 1}` }>
          <FlatButton label='Next' />
        </Link>
      );
    } else {
      return (
        <FlatButton label='Next' disabled />
      );
    }
  }

  get pagination() {
    const { baseUrl, current, maxPage } = this.props;
    var min = current - 4;
    var max;
    // Calculate min page
    min = Math.max(min, 1);
    // Calculate max page
    max = Math.min(min + 9, maxPage);

    if (max - min < 9) { // If not enough for 10 page
      // Modify min page
      min = Math.max(1, max - 9);
    }

    return times(max - min + 1, (i) => {
      const page = min + i;
      return (
        <Link key={ i } to={ `${baseUrl}?page=${page}` }>
          <FlatButton
            primary={ page === current }
            style={ styles.page }
            labelStyle={ styles.noPadding }
            label={ `${page}` } />
        </Link>
      );
    });
  }

  render() {
    return (
      <CenterBlock fullwidth>
        { this.prevButton }
        { this.pagination }
        { this.nextButton }
      </CenterBlock>
    );
  }

  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired
  };
}

export default Pagination;

const styles = {
  page: {
    maxWidth: '34px',
    minWidth: '34px'
  },
  noPadding: {
    padding: '0'
  }
};
