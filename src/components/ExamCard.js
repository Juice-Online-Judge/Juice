import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import TitleCard from './TitleCard';

class ExamCard extends Component {
  render() {
    const { id, name, beganTime, endedTime } = this.props;
    return (
      <Link to={ `/exam/${id}` }>
        <TitleCard
          title={ name }
          subtitle={ `${beganTime} ~ ${endedTime}` } />
      </Link>
    );
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    beganTime: PropTypes.string.isRequired,
    endedTime: PropTypes.string.isRequired
  };
}

export default ExamCard;
