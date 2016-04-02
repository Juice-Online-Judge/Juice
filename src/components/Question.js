import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

class Question extends Component {
  render() {
    const { question } = this.props;

    return (
      <Card>
        <CardTitle actAsExpander title={ question.get('title') } />
        <CardText expandable>
          { question.get('description') }
        </CardText>
        <CardActions expandable>
          <FlatButton label='Submit' primary />
        </CardActions>
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired
};

export default Question;
