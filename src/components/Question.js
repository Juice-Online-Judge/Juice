import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import LaunchIcon from 'material-ui/lib/svg-icons/action/launch';

class Question extends Component {
  get expandButton() {
    const { question } = this.props;
    if (this.expanded) {
      return null;
    }

    return (
      <Link to={ `/question/${question.get('uuid')}` }>
        <IconButton style={ styles.iconBtn }>
          <LaunchIcon />
        </IconButton>
      </Link>
    );
  }
  render() {
    const { question, expanded } = this.props;

    return (
      <Card>
        <CardTitle
          actAsExpander={ !expanded }
          showExpandableButton={ !expanded }
          title={ question.get('title') } />
        <CardText style={ styles.textContainer } expandable={ !expanded }>
          { question.get('description') }
          { this.expandButton }
        </CardText>
        <CardActions expandable={ !expanded }>
          <FlatButton label='Submit' primary />
        </CardActions>
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
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
  }
};

export default Question;
