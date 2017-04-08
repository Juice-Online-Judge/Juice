import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import {bind} from 'decko'

import {Row, Col} from 'react-flexbox-grid'
import {Link} from 'react-router-dom'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import CodeIcon from 'material-ui/svg-icons/action/code'

const PENDING = 'PENDING'
const REVIEWING = 'AC (Reviewing)'
const HIDE_CLASS = 'xs-hide sm-hide'

const getResult = ({result, needReview}) => {
  if (!result) {
    return PENDING
  }
  if (result === 'AC' && needReview) {
    return REVIEWING
  }

  return result
}

export class Submission extends Component {
  @bind handleFilterQuestion() {
    const {quesUuid} = this.props
    this.addFilter({question: quesUuid})
  }

  @bind handleFilterUser() {
    const {userId} = this.props
    this.addFilter({user: userId})
  }

  addFilter(filter) {
    const {addFilter} = this.props
    if (addFilter) {
      addFilter(filter)
    }
  }

  render() {
    const {
      id,
      addFilter,
      quesUuid,
      examId,
      title,
      language,
      username,
      time,
      memory,
      result,
      needReview
    } = this.props
    const resultText = getResult({result, needReview})
    const resultStyle = {color: resultColor[result] || resultColor['fail']}
    const origQuesUrl = `/questions/${quesUuid}`
    const quesUrl = examId ? `/exams/${examId}${origQuesUrl}` : origQuesUrl
    const origSubUrl = `/submissions/${id}/code`
    const subUrl = examId ? `/exams/${examId}${origSubUrl}` : origSubUrl
    return (
      <Card>
        <CardText style={ styles.padding }>
          <Row middle='xs'>
            <Col xs={ 1 }>
              {id}
            </Col>
            <Col xs={ addFilter ? 6 : 7 } md={ addFilter ? 4 : 5 }>
              <Link to={ quesUrl }>
                {title}
              </Link>
            </Col>
            <Col xs={ 1 }>
              {examId ? username : null}
            </Col>
            <Col xs={ 2 } md={ 1 }>
              <span style={ resultStyle }>
                {resultText}
              </span>
            </Col>
            <Col className={ HIDE_CLASS } style={ styles.upperCase } md={ 1 }>
              {language}
            </Col>
            <Col className={ HIDE_CLASS } md={ 1 }>
              {time || 'N/A'} s
            </Col>
            <Col className={ HIDE_CLASS } md={ 1 }>
              {memory || 'N/A'} MB
            </Col>
            <Col xs={ 1 }>
              <Link to={ subUrl }>
                <IconButton tooltip='View Code'>
                  <CodeIcon />
                </IconButton>
              </Link>
            </Col>
            {addFilter
              ? <Col xs={ 1 }>
                <IconMenu
                  iconButtonElement={
                    <IconButton> <MoreVertIcon /> </IconButton>
                    }
                  anchorOrigin={ styles.origin }
                  targetOrigin={ styles.origin }>
                  <MenuItem
                    primaryText='Filter by this question'
                    onTouchTap={ this.handleFilterQuestion } />
                  <MenuItem
                    primaryText='Filter by this user'
                    onTouchTap={ this.handleFilterUser } />
                </IconMenu>
              </Col>
              : null}
          </Row>
        </CardText>
      </Card>
    )
  }

  static propTypes = {
    addFilter: PropTypes.func,
    id: PropTypes.number.isRequired,
    needReview: PropTypes.bool.isRequired,
    quesUuid: PropTypes.string.isRequired,
    userId: PropTypes.number,
    examId: PropTypes.string,
    title: PropTypes.string.isRequired,
    username: PropTypes.string,
    language: PropTypes.string.isRequired,
    time: PropTypes.string,
    memory: PropTypes.string,
    result: PropTypes.string
  };
}

const resultColor = {
  AC: '#008000',
  [REVIEWING]: '#ffa500',
  [PENDING]: '#444',
  fail: '#ff0000'
}

const styles = {
  bold: {
    fontWeight: 'bold'
  },
  upperCase: {
    textTransform: 'uppercase'
  },
  origin: {
    horizontal: 'left',
    vertical: 'top'
  },
  padding: {
    padding: '0 16px'
  }
}

export default Radium(Submission)
