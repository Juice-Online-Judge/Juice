import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';

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
