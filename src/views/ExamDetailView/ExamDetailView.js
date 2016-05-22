import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { Link } from 'react-router';
import Inset from 'layouts/Inset';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlipToFrontIcon from 'material-ui/svg-icons/action/flip-to-front';
import CopyButton from 'components/CopyButton';
import { Row, Col } from 'react-flexbox-grid';
import { fetchExamToken } from 'redux/modules/exam';
import { filterStringify, parseFilter, addFilter, clearFilter } from 'redux/modules/submissionFilter';
import styles from 'lib/styles';

class ExamDetailView extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    const { submissionFilter } = this.props;
    this.props.fetchExamToken(id);
    this.setState({ filter: filterStringify(submissionFilter) });
  }

  componentWillReceiveProps(nextProps) {
    const nextFilter = nextProps.submissionFilter;
    if (nextFilter !== this.props.submissionFilter) {
      this.setState({ filter: filterStringify(nextFilter) });
    }
  }

  @bind
  handleFocus() {
    this.refs.textField.select();
  }

  @bind
  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  @bind
  handleKeyDown(event) {
    if (event.keyCode === 13) {
      const newFilter = parseFilter(this.state.filter);
      if (newFilter === null) {
        this.setState({ errorText: 'Syntax error' });
      } else {
        this.setState({ errorText: null });
        this.props.addFilter(newFilter);
      }
    }
  }

  @bind
  handleClearFilter() {
    this.props.clearFilter();
  }

  get switchButton() {
    const { id } = this.props.params;
    const { path } = this.props.routes[2];
    const othFunc = path === 'questions' ? 'submissions' : 'questions';
    return (
      <Link to={ `/exams/${id}/${othFunc}` }>
        <FloatingActionButton style={ styles.floatBtn } >
          <FlipToFrontIcon />
        </FloatingActionButton>
      </Link>
    );
  }

  render() {
    const { id } = this.props.params;
    const { exam, children } = this.props;
    const token = exam.getIn(['tokens', `${id}`]);
    const { path } = this.props.routes[2];
    const isSubmission = path === 'submissions';
    return (
      <Inset>
        <Row middle='md'>
          {
            isSubmission ? (
              <Col md={ 7 }>
                <Row>
                  <Col md={ 8 }>
                    <TextField
                      name='filter'
                      fullWidth
                      errorText={ this.state.errorText }
                      onKeyDown={ this.handleKeyDown }
                      onChange={ this.handleChange }
                      value={ this.state.filter } />
                  </Col>
                  <Col md={ 4 }>
                    <FlatButton
                      onTouchTap={ this.handleClearFilter }
                      secondary
                      label='Clear filter' />
                  </Col>
                </Row>
              </Col>
            ) : null
          }
          <Col md={ 1 } mdOffset={ isSubmission ? 0 : 7 } >
            <span>Token: </span>
          </Col>
          <Col md={ 3 } >
            <TextField
              ref='textField'
              name='token'
              onFocus={ this.handleFocus }
              value={ token || 'Unavailable' } />
          </Col>
          <Col md={ 1 }>
            <CopyButton text={ token } />
          </Col>
        </Row>
        { Children.only(children) }
        { this.switchButton }
      </Inset>
    );
  }

  state = {
    filter: '',
    errorText: null
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    exam: PropTypes.object.isRequired,
    submissionFilter: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    addFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    fetchExamToken: PropTypes.func.isRequired
  }
}

export default connect((state) => ({
  exam: state.exam,
  submissionFilter: state.submissionFilter
}), { fetchExamToken, addFilter, clearFilter })(ExamDetailView);
