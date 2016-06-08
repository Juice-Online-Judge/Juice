import React from 'react'
import { shallow } from 'enzyme'
import Inset from 'layouts/Inset'
import { Grid, Row, Col } from 'react-flexbox-grid'

describe('(Layout) <Inset />', () => {
  it('Render a <Grid /> component', () => {
    const wrapper = shallow(<Inset />)
    expect(wrapper).to.have.exactly(1).descendants(Grid)
  })

  it('Render a <Row /> component', () => {
    const wrapper = shallow(<Inset />)
    expect(wrapper).to.have.exactly(1).descendants(Row)
  })

  it('Render a <Col /> component', () => {
    const wrapper = shallow(<Inset />)
    expect(wrapper).to.have.exactly(1).descendants(Col)
  })

  it('Render children when passed in', () => {
    const wrapper = shallow(
      <Inset>
        <div className='child' />
      </Inset>
    )
    expect(wrapper).to.contain(<div className='child' />)
  })
})
