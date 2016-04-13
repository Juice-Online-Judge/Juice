import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';

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

  render() {
    return (
      <CenterBlock>
        { this.prevButton }
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
