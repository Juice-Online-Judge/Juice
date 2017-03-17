import React, { Component, PropTypes } from 'react'
import { bind } from 'decko'
import pick from 'lodash/pick'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Toggle from 'material-ui/Toggle'
import MenuItem from 'material-ui/MenuItem'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import Label from 'components/Label'

const isNotPortion = (type) => type !== 'portion_num' && type !== 'portion_str'

class QuestionSetting extends Component {
  componentDidMount() {
    this.settingToState(this.props.setting)
  }

  componentWillReceiveProps(newProps) {
    this.settingToState(newProps.setting)
  }

  settingToState(setting) {
    if (setting) {
      const score = setting.score || ''
      const type = setting.type || 'normal'
      const readFrom = setting.readFrom || 'stdin'
      const codeReview = setting.codeReview
      const goal = setting.goal || ''
      const reward = setting.reward || ''
      this.setState({ score, type, goal, reward, codeReview, readFrom })
    }
  }

  @bind
  handleScoreChange(event) {
    this.emitChange({ score: parseFloat(event.target.value) })
  }

  @bind
  handleIntValChange(event) {
    const { name, value } = event.target
    const newState = {}
    newState[name] = parseInt(value)
    this.emitChange(newState)
  }

  @bind
  handleTypeChange(_event, _idx, value) {
    this.emitChange({ type: value })
  }

  @bind
  handleReadFromChange(_event, _idx, value) {
    this.emitChange({ readFrom: value })
  }

  @bind
  handleCodeReviewChange({ target: { checked } }) {
    this.emitChange({ codeReview: checked })
  }

  emitChange(data) {
    const mergeData = {
      ...pick(this.state, [
        'score',
        'type',
        'readFrom',
        'codeReview',
        'goal',
        'reward'
      ]),
      ...data
    }
    const { uuid } = this.props
    this.setState(data)
    if (mergeData.type === 'normal') {
      mergeData.type = null
      mergeData.goal = null
      mergeData.reward = null
    }

    this.props.onChange(uuid, mergeData)
  }

  render() {
    const { detail, question, uuid } = this.props
    const { score, type, readFrom, codeReview, goal, reward } = this.state

    if (!detail) {
      return null
    }

    return (
      <div>
        <Card>
          <CardTitle>
            <FlatButton label='Back' onTouchTap={ this.props.onBack } icon={ <ChevronLeft /> } />
            <span> Setting "{ question.getIn(['entities', 'question', uuid, 'title']) }" </span>
          </CardTitle>
          <CardActions>
            <TextField
              fullWidth
              floatingLabelText='Score'
              onChange={ this.handleScoreChange }
              value={ score } />
          </CardActions>
          <CardActions>
            <Label> Type </Label>
            <SelectField value={ type } onChange={ this.handleTypeChange }>
              <MenuItem value='normal' primaryText='Normal' />
              <MenuItem value='proportion' primaryText='Proportion' />
              <MenuItem value='portion_num' primaryText='Portion (Number)' />
              <MenuItem value='portion_str' primaryText='Portion (String)' />
            </SelectField>
          </CardActions>
          <CardActions>
            <Label> Read from </Label>
            <SelectField value={ readFrom } onChange={ this.handleReadFromChange }>
              <MenuItem value='stdin' primaryText='stdin' />
              <MenuItem value='file' primaryText='file' />
            </SelectField>
          </CardActions>
          <CardActions>
            <Toggle
              label='Code review'
              labelPosition='right'
              toggle={ codeReview }
              onToggle={ this.handleCodeReviewChange } />
          </CardActions>
          <CardActions>
            <TextField
              fullWidth
              name='goal'
              disabled={ isNotPortion(type) }
              floatingLabelText='Goal'
              onChange={ this.handleIntValChange }
              value={ goal } />
          </CardActions>
          <CardActions>
            <TextField
              fullWidth
              name='reward'
              disabled={ isNotPortion(type) }
              floatingLabelText='Reward'
              onChange={ this.handleIntValChange }
              value={ reward } />
          </CardActions>
        </Card>
      </div>
    )
  }

  state = {
    score: 100,
    type: 'normal',
    goal: '',
    reward: ''
  };

  static propTypes = {
    question: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    detail: PropTypes.bool.isRequired,
    setting: PropTypes.object,
    uuid: PropTypes.string
  };
}

export default QuestionSetting
