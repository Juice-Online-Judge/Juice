import React, { PropTypes } from 'react';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import compose from 'recompose/compose';

import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';

const TitleCard = compose(
  setPropTypes({
    style: PropTypes.object,
    children: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string
  }),
  setDisplayName('TitleCard')
)(({ style, title, subtitle, children }) => (
  <Card>
    <CardTitle
      style={ this.props.style }
      title={ this.props.title }
      subtitle={ this.props.subtitle }>
      { this.props.children }
    </CardTitle>
  </Card>
));

export default TitleCard;
