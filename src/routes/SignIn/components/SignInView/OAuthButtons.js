import React from 'react'

import IconButton from 'material-ui/IconButton'
import {Row, Col} from 'react-flexbox-grid'

export const OAuthButtons = () => (
  <Row end='xs'>
    <Col>
      <a href='/oauth/facebook'>
        <IconButton iconClassName='fa fa-facebook-square' />
      </a>
      <a href='/oauth/github'>
        <IconButton iconClassName='fa fa-github' />
      </a>
    </Col>
  </Row>
)

export default OAuthButtons
