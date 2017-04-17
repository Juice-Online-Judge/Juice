import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bind} from 'decko'

import {
  filterStringify,
  parseFilter,
  addFilter,
  clearFilter
} from 'redux/modules/submissionFilter'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {Row, Col} from 'react-flexbox-grid'

class Filter extends Component {
  componentDidMount() {
    const {submissionFilter} = this.props

    this.setState({filter: filterStringify(submissionFilter)})
  }

  componentWillReceiveProps(nextProps) {
    const nextFilter = nextProps.submissionFilter
    if (nextFilter !== this.props.submissionFilter) {
      this.setState({filter: filterStringify(nextFilter)})
    }
  }

  @bind handleChange(event) {
    this.setState({filter: event.target.value})
  }

  @bind handleKeyDown(event) {
    if (event.keyCode === 13) {
      const newFilter = parseFilter(this.state.filter)
      if (newFilter === null) {
        this.setState({errorText: 'Syntax error'})
      } else {
        this.setState({errorText: null})
        this.props.addFilter(newFilter)
      }
    }
  }

  @bind handleClearFilter() {
    this.props.clearFilter()
  }

  render() {
    const {filter, errorText} = this.state
    const {handleChange, handleKeyDown, handleClearFilter} = this
    return (
      <Col md={ 7 }>
        <Row>
          <Col md={ 8 }>
            <TextField
              name='filter'
              fullWidth
              errorText={ errorText }
              onKeyDown={ handleKeyDown }
              onChange={ handleChange }
              value={ filter } />
          </Col>
          <Col md={ 4 }>
            <FlatButton
              onTouchTap={ handleClearFilter }
              secondary
              label='Clear filter' />
          </Col>
        </Row>
      </Col>
    )
  }

  state = {
    filter: '',
    errorText: ''
  }

  static propTypes = {
    submissionFilter: PropTypes.object.isRequired,
    addFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired
  }
}

export default connect(
  ({submissionFilter}) => ({
    submissionFilter
  }),
  {addFilter, clearFilter}
)(Filter)
