import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';

class TitleCard extends Component {
  render() {
    return (
      <Card>
        <CardTitle
          title={ this.props.title }
          subtitle={ this.props.subtitle } />
      </Card>
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
  };
}

export default TitleCard;
