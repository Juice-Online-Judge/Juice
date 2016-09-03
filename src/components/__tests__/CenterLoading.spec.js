import React from 'react'
import { shallow } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'
import { CenterLoading } from '../CenterLoading'
import { Row, Col } from 'react-flexbox-grid'
import RefreshIndicator from 'material-ui/RefreshIndicator'

describe('(Component) <CenterLoading />', () => {
  let sut

  beforeEach(() => {
    jasmineEnzyme()
    sut = shallow(<CenterLoading loading={ false } left={ 10 } />)
  })

  it('Render <Row /> with prop center', () => {
    expect(sut.find(Row).length).toBe(1)
    expect(sut.find(Row).first()).toHaveProp('center', 'xs')
  })

  it('Render <Col />', () => {
    expect(sut.find(Col).length).toBe(1)
  })

  it('Render <RefreshIndicator />', () => {
    expect(sut.find(RefreshIndicator).length).toBe(1)
  })

  describe('(Prop) loading', () => {
    describe('When false', () => {
      it('Render <RefreshIndicator status="hide" />', () => {
        expect(sut.find(RefreshIndicator)).toHaveProp('status', 'hide')
      })
    })

    describe('When true', () => {
      it('Render <RefreshIndicator status="loading" />', () => {
        const sut = shallow(<CenterLoading loading left={ 10 } />)
        expect(sut.find(RefreshIndicator)).toHaveProp('status', 'loading')
      })
    })
  })

  describe('(Prop) left', () => {
    it('Pass to <RefreshIndicator />', () => {
      expect(sut.find(RefreshIndicator)).toHaveProp('left', 10)

      sut.setProps({ left: 20 })
      expect(sut.find(RefreshIndicator)).toHaveProp('left', 20)
    })
  })
})
