import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import ProjectDisplay from './ProjectDisplay'
import MemberDisplay from './MemberDisplay'

const AboutUsView = () => (
  <Card>
    <CardTitle title='Juice: Join Us In Code Education.' />
    <CardText>
      <p> This project is open source on Github: </p>
      <ProjectDisplay project='Juice' desc='Website' />
      <ProjectDisplay project='Judge' desc='Judge' />
      <ProjectDisplay project='CLI' desc='CLI client' />
    </CardText>
    <CardText>
      Our team:
      <MemberDisplay name='DanSnow' github='DanSnow' desc='Front-end Developer.' />
      <MemberDisplay name='BePsvPT' github='BePsvPT' desc='Back-end Developer.' />
      <MemberDisplay name='silenttulips' github='silenttulips' desc='Judge.' />
      <MemberDisplay name='HWLin' github='hwlin1414' desc='CLI client & Server Admin.' />
    </CardText>
  </Card>
)

export default AboutUsView
