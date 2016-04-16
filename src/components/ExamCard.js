import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import TitleCard from './TitleCard';
import styles from 'lib/styles';

class ExamCard extends Component {
  render() {
    const { id, name, beganTime, endedTime } = this.props;
    return (
      <Link to={ `/exams/${id}` } style={ styles.noUnderline }>
        <TitleCard
          title={ name }
          subtitle={ `${beganTime} ~ ${endedTime}` } />
      </Link>
    );
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    beganTime: PropTypes.string.isRequired,
    endedTime: PropTypes.string.isRequired
  };
}

export default ExamCard;
