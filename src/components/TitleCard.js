import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';

class TitleCard extends Component {
  render() {
    return (
      <Card>
        <CardTitle
          style={ this.props.style }
          title={ this.props.title }
          subtitle={ this.props.subtitle }>
          { this.props.children }
        </CardTitle>
      </Card>
    );
  }

  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string
  };
}

export default TitleCard;
