import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/fp/pick'

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

const isNotPortion = type => !type.startsWith('portion')
const pickSettings = pick([
  'score',
  'type',
  'readFrom',
  'codeReview',
  'goal',
  'reward'
])

class QuestionSetting extends Component {
  componentDidMount () {
    this.settingToState(this.props.setting)
  }

  componentWillReceiveProps (newProps) {
    this.settingToState(newProps.setting)
  }

  settingToState (setting) {
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

  handleScoreChange = event => {
    this.emitChange({ score: parseFloat(event.target.value) })
  }

  handleIntValChange = ({ target: { name, value } }) => {
    const newState = {}
    newState[name] = parseInt(value)
    this.emitChange(newState)
  }

  handleTypeChange = (_event, _idx, value) => {
    this.emitChange({ type: value })
  }

  handleReadFromChange = (_event, _idx, value) => {
    this.emitChange({ readFrom: value })
  }

  handleCodeReviewChange = ({ target: { checked } }) => {
    this.emitChange({ codeReview: checked })
  }

  emitChange (data) {
    const mergeData = {
      ...pickSettings(this.state),
      ...data
    }
    const { uuid } = this.props
    this.setState(data)

    // These proerty is not necessery when type is normal
    if (mergeData.type === 'normal') {
      mergeData.type = null
      mergeData.goal = null
      mergeData.reward = null
    }

    this.props.onChange(uuid, mergeData)
  }

  render () {
    const { detail, question, uuid } = this.props
    const { score, type, readFrom, codeReview, goal, reward } = this.state

    if (!detail) {
      return null
    }

    return (
      <div>
        <Card>
          <CardTitle>
            <FlatButton
              label='Back'
              onClick={this.props.onBack}
              icon={<ChevronLeft />} />
            <span>
              Setting "{question.getIn([
                'entities',
                'question',
                uuid,
                'title'
              ])}"
            </span>
          </CardTitle>
          <CardActions>
            <TextField
              fullWidth
              floatingLabelText='Score (%)'
              onChange={this.handleScoreChange}
              value={score} />
          </CardActions>
          <CardActions>
            <Label htmlFor='type'> 題目類型 </Label>
            <SelectField
              name='type'
              value={type}
              onChange={this.handleTypeChange}>
              <MenuItem value='normal' primaryText='一般' />
              <MenuItem value='proportion' primaryText='部份給分' />
              <MenuItem value='portion_num' primaryText='誤差容許 (數字)' />
              <MenuItem value='portion_str' primaryText='誤差容許 (字串)' />
            </SelectField>
          </CardActions>
          <CardActions>
            <Label htmlFor='source'> 測資來源 </Label>
            <SelectField
              name='source'
              value={readFrom}
              onChange={this.handleReadFromChange}>
              <MenuItem value='stdin' primaryText='stdin' />
              <MenuItem value='file' primaryText='file' />
            </SelectField>
          </CardActions>
          <CardActions>
            <Toggle
              label='Code review'
              labelPosition='right'
              toggled={codeReview}
              onToggle={this.handleCodeReviewChange} />
          </CardActions>
          <CardActions>
            <TextField
              fullWidth
              name='goal'
              disabled={isNotPortion(type)}
              floatingLabelText='Goal'
              onChange={this.handleIntValChange}
              value={goal} />
          </CardActions>
          <CardActions>
            <TextField
              fullWidth
              name='reward'
              disabled={isNotPortion(type)}
              floatingLabelText='Reward'
              onChange={this.handleIntValChange}
              value={reward} />
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
  }

  static propTypes = {
    question: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    detail: PropTypes.bool.isRequired,
    setting: PropTypes.object,
    uuid: PropTypes.string
  }
}

export default QuestionSetting
