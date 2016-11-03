import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

const AboutUsView = () => (
  <Card>
    <CardTitle title='Juice: Join Us In Code Education.' />
    <CardText>
      <p> This project is open source on Github: </p>
      <div>
        Website:
        <a href='https://github.com/Sunday-Without-God/Juice' target='_blank' rel='noopener noreferrer'>
          https://github.com/Sunday-Without-God/Juice
        </a>
      </div>
      <div>
        Judge:
        <a href='https://github.com/Sunday-Without-God/Judge' target='_blank' rel='noopener noreferrer'>
          https://github.com/Sunday-Without-God/Judge
        </a>
      </div>
      <div>
        CLI client:
        <a href='https://github.com/Sunday-Without-God/CLI' target='_blank' rel='noopener noreferrer'>
          https://github.com/Sunday-Without-God/CLI
        </a>
      </div>
    </CardText>
    <CardText>
      Our team:
      <p>
        <a href='https://github.com/DanSnow' target='_blank' rel='noopener noreferrer'> DanSnow </a>:
        Front-end Developer.
      </p>
      <p>
        <a href='https://github.com/BePsvPT' target='_blank' rel='noopener noreferrer'> BePsvPT </a>:
        Back-end Developer.
      </p>
      <p>
        <a href='https://github.com/silenttulips' target='_blank' rel='noopener noreferrer'> silenttulips </a>:
        Judge.
      </p>
      <p>
        <a href='https://github.com/hwlin1414' target='_blank' rel='noopener noreferrer'> HWLin </a>:
        CLI client & Server Admin.
      </p>
    </CardText>
  </Card>
)

export default AboutUsView
