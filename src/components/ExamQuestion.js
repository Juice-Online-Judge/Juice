import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ForwardIcon from 'material-ui/svg-icons/content/forward';
import TitleCard from './TitleCard';

class ExamQuestion extends Component {
  @autobind
  handleCheck(event) {
    this.props.onCheck(event.target.checked, this.props.uuid);
  }

  @autobind
  handleRequestDetail() {
    this.props.onRequestDetail(this.props.uuid);
  }

  render() {
    const { uuid, question, checked } = this.props;
    const questionDetail = question.getIn(['entities', 'question', uuid]);
    return (
      <TitleCard style={ styles.card }>
        <Row middle='md'>
          <Col md={ 1 }>
            <Checkbox checked={ checked } onCheck={ this.handleCheck } />
          </Col>
          <Col md={ 10 }>
            { questionDetail.get('title') }
          </Col>
          <Col>
            <IconButton onTouchTap={ this.handleRequestDetail }>
              <ForwardIcon />
            </IconButton>
          </Col>
        </Row>
      </TitleCard>
    );
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onCheck: PropTypes.func.isRequired,
    onRequestDetail: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ question: state.question }))(ExamQuestion);

const styles = {
  card: {
    padding: '0 16px'
  }
};
