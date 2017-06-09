import React from 'react'
import PropTypes from 'prop-types'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'

export const TitleCard = compose(
  setPropTypes({
    style: PropTypes.object,
    children: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string
  }),
  setDisplayName('TitleCard')
)(({style, title, subtitle, children}) =>
  <Card>
    <CardTitle style={style} title={title} subtitle={subtitle}>
      {children}
    </CardTitle>
  </Card>
)

export default TitleCard
