import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { Link } from 'react-router';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import LaunchIcon from 'material-ui/lib/svg-icons/action/launch';

import SubmitCode from './SubmitCode';

import { actions as questionActions, questionSelector } from 'redux/modules/question';

export class Question extends Component {
  componentDidMount() {
    const { expanded } = this.props;
    if (expanded) {
      this.fetchQuestionDetail();
    }
  }

  @autobind
  handleExpandChange(expandedState) {
    if (expandedState && !this.state.fetched) {
      this.fetchQuestionDetail();
    }
  }

  fetchQuestionDetail() {
    const { question, uuid } = this.props;
    if (question && question.get('detail')) {
      this.setState({ fetched: true });
      return;
    }

    this.props.fetchQuestionDetail(uuid);
  }

  get expandButton() {
    const { uuid } = this.props;
    if (this.props.expanded) {
      return null;
    }

    return (
      <Link to={ `/question/${uuid}` }>
        <IconButton style={ styles.iconBtn }>
          <LaunchIcon />
        </IconButton>
      </Link>
    );
  }

  render() {
    const { uuid, question, expanded } = this.props;

    if (expanded) {
      return (
        <Card>
          <CardTitle
            title={ question.get('title') } />
          <CardText style={ styles.textContainer }>
            <div style={ styles.textWrap }>
              { question.get('description') }
            </div>
          </CardText>
          <CardActions>
            <SubmitArea expanded uuid={ uuid }/>
          </CardActions>
        </Card>
      );
    } else {
      return (
        <Link style={ styles.noUnderline } to={ `/question/${uuid}` }>
          <Card>
            <CardTitle
              title={ question.get('title') } />
          </Card>
        </Link>
      );
    }
  }

  state = {
    fetched: false
  };
}

Question.propTypes = {
  uuid: PropTypes.string.isRequired,
  question: PropTypes.object,
  fetchQuestionDetail: PropTypes.func.isRequired,
  expanded: PropTypes.bool
};

export default connect((state, props) => {
  return { question: questionSelector(state, props) };
}, questionActions)(Question);

class SubmitArea extends Component {
  @autobind
  handleSubmit() {
    this.setState({ open: true });
  }

  @autobind
  handleClose() {
    this.setState({ open: false });
  }

  get submitArea() {
    if (this.props.expanded) {
      return (
        <SubmitCode
          uuid={ this.props.uuid } />
      );
    } else {
      return (
        <Dialog
          title='Submit code'
          open={ this.state.open }
          onRequestClose={ this.handleClose } >
          <SubmitCode
            uuid={ this.props.uuid }
            dialog
            onRequestClose={ this.handleClose } />
        </Dialog>
      );
    }
  }

  get submitButton() {
    if (this.props.expanded) {
      return null;
    }

    return (
      <FlatButton label='Submit' onTouchTap={ this.handleSubmit } primary />
    );
  }

  render() {
    return (
      <div>
        { this.submitButton }
        { this.submitArea }
      </div>
    );
  }

  static propTypes = {
    expanded: PropTypes.bool,
    uuid: PropTypes.string.isRequired
  };

  state = {
    open: false
  };
}

const styles = {
  iconBtn: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '4px'
  },
  textContainer: {
    position: 'relative'
  },
  textWrap: {
    marginRight: '54px'
  },
  noUnderline: {
    textDecoration: 'none'
  }
};
