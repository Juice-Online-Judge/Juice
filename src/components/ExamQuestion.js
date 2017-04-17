import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Row, Col} from 'react-flexbox-grid'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import TitleCard from './TitleCard'

class ExamQuestion extends Component {
  handleCheck = _event => {
    const {checked} = this.props
    this.props.onCheck(!checked, this.props.uuid)
  }

  handleRequestDetail = () => {
    if (this.props.checked) {
      this.props.onRequestDetail(this.props.uuid)
    }
  }

  render() {
    const {uuid, question, checked} = this.props
    const questionDetail = question.getIn(['entities', 'question', uuid])
    return (
      <TitleCard style={ styles.card }>
        <Row middle='md'>
          <Col md={ 1 }>
            <Checkbox checked={ checked } onCheck={ this.handleCheck } />
          </Col>
          <Col style={ styles.clickable } onClick={ this.handleCheck } md={ 10 }>
            {questionDetail.get('title')}
          </Col>
          <Col>
            <FlatButton
              disabled={ !checked }
              icon={ <ChevronRight /> }
              onTouchTap={ this.handleRequestDetail }>
              評分設定
            </FlatButton>
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
  }
}

export default connect(state => ({question: state.question}))(ExamQuestion)

const styles = {
  card: {
    padding: '0 16px'
  },
  clickable: {
    cursor: 'pointer',
    userSelect: 'none'
  }
}
