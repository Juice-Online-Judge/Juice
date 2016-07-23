jest.unmock('../Inset')

import React from 'react'
import { shallow } from 'enzyme'
import Inset from '../Inset'
import { Grid, Row, Col } from 'react-flexbox-grid'

describe('(Layout) <Inset />', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<Inset />)
  })

  it('Render a <Grid /> component', () => {
    expect(sut.find(Grid).length).toBe(1)
  })

  it('Render a <Row /> component', () => {
    expect(sut.find(Row).length).toBe(1)
  })

  it('Render a <Col /> component', () => {
    expect(sut.find(Col).length).toBe(1)
  })

  it('Render children when passed in', () => {
    const sut = shallow(
      <Inset>
        <div className='child' />
      </Inset>
    )
    expect(sut).toContainReact(<div className='child' />)
  })
})
