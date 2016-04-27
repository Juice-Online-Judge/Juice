import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Link } from 'react-router';
import Inset from 'layouts/Inset';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlipToFrontIcon from 'material-ui/svg-icons/action/flip-to-front';
import CopyButton from 'components/CopyButton';
import { Row, Col } from 'react-flexbox-grid';
import { fetchExamToken } from 'redux/modules/exam';
import styles from 'lib/styles';

class ExamDetailView extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchExamToken(id);
  }

  @autobind
  handleFocus() {
    this.refs.textField.select();
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
    return (
      <Inset>
        <Row middle='md'>
          <Col md={ 1 } mdOffset={ 7 } >
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

  static propTypes = {
    children: PropTypes.element.isRequired,
    exam: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    fetchExamToken: PropTypes.func.isRequired
  }
}

export default connect((state) => ({
  exam: state.exam
}), { fetchExamToken })(ExamDetailView);
