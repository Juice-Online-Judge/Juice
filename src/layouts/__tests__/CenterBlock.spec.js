import React from 'react'
import { shallow } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'
import CenterBlock from '../CenterBlock'
import { Grid, Row, Col } from 'react-flexbox-grid'

describe('(Layout) <CenterBlock />', () => {
  let sut

  beforeEach(() => {
    jasmineEnzyme()
    sut = shallow(<CenterBlock />)
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
      <CenterBlock>
        <div className='child' />
      </CenterBlock>
    )
    expect(sut).toContainReact(<div className='child' />)
  })

  describe('(Prop) fullwidth', () => {
    describe('When not fullwidth', () => {
      it('Render <Col /> with md={ 6 }', () => {
        expect(sut.find(Col).first()).toHaveProp('md', 6)
      })
    })

    describe('When fullwidth', () => {
      it('Render <Col /> with md={ 12 }', () => {
        const sut = shallow(
          <CenterBlock fullwidth />
        )

        expect(sut.find(Col).first()).toHaveProp('md', 12)
      })
    })
  })
})
