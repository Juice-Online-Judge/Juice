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
import LaunchIcon from 'material-ui/lib/svg-icons/action/launch';

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
    const { question, expanded } = this.props;

    return (
      <Card onExpandChange={ this.handleExpandChange }>
        <CardTitle
          actAsExpander={ !expanded }
          showExpandableButton={ !expanded }
          title={ question.get('title') } />
        <CardText style={ styles.textContainer } expandable={ !expanded }>
          <div style={ styles.textWrap }>
            { question.get('description') }
          </div>
          { this.expandButton }
        </CardText>
        <CardActions expandable={ !expanded }>
          <FlatButton label='Submit' primary />
        </CardActions>
      </Card>
    );
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
  }
};

export default connect((state, props) => {
  return { question: questionSelector(state, props) };
}, questionActions)(Question);
