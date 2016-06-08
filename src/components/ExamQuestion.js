import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import { Row, Col } from 'react-flexbox-grid'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import TitleCard from './TitleCard'

class ExamQuestion extends Component {
  @bind
  handleCheck(event) {
    this.props.onCheck(event.target.checked, this.props.uuid)
  }

  @bind
  handleRequestDetail() {
    if (this.props.checked) {
      this.props.onRequestDetail(this.props.uuid)
    }
  }

  render() {
    const { uuid, question, checked } = this.props
    const questionDetail = question.getIn(['entities', 'question', uuid])
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
            <IconButton disabled={ !checked } onTouchTap={ this.handleRequestDetail }>
              <ChevronRight />
            </IconButton>
          </Col>
        </Row>
      </TitleCard>
    )
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onCheck: PropTypes.func.isRequired,
    onRequestDetail: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ question: state.question }))(ExamQuestion)

const styles = {
  card: {
    padding: '0 16px'
  }
}
