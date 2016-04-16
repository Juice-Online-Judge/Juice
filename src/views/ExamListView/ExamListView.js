import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Inset from 'layouts/Inset';
import ExamCard from 'components/ExamCard';

import { actions as examActions } from 'redux/modules/exam';

class ExamListView extends Component {
  componentDidMount() {
    this.props.fetchExams();
  }

  render() {
    const { exam } = this.props;
    const examData = exam.getIn(['entities', 'exam']);
    return (
      <Inset>
        {
          exam.get('result').map((id) => {
            return (
              <ExamCard
                id={ id }
                key={ id }
                name={ examData.getIn([`${id}`, 'name']) }
                beganTime={ examData.getIn([`${id}`, 'began_at']) }
                endedTime={ examData.getIn([`${id}`, 'ended_at']) }/>
            );
          })
        }
      </Inset>
    );
  }

  static propTypes = {
    exam: PropTypes.object.isRequired,
    fetchExams: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ exam: state.exam }),
  examActions)(ExamListView);
