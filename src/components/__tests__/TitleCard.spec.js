import React from 'react'
import { shallow } from 'enzyme'
import { TitleCard } from '../TitleCard'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'

describe('(Component) <TitleCard />', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<TitleCard />)
  })

  it('Render <Card />', () => {
    expect(sut.find(Card).length).toBe(1)
  })

  it('Render <CardTitle />', () => {
    expect(sut.find(CardTitle).length).toBe(1)
  })

  describe('(Prop) title', () => {
    it('Pass to <CardTitle />', () => {
      const sut = shallow(<TitleCard title='foo' />)

      expect(sut.find(CardTitle)).toHaveProp('title', 'foo')
    })
  })

  describe('(Prop) subtitle', () => {
    it('Pass to <CardTitle />', () => {
      const sut = shallow(<TitleCard subtitle='foo' />)

      expect(sut.find(CardTitle)).toHaveProp('subtitle', 'foo')
    })
  })

  describe('(Prop) style', () => {
    it('Pass to <CardTitle />', () => {
      const style = { foo: 'bar' }
      const sut = shallow(<TitleCard style={ style } />)

      expect(sut.find(CardTitle)).toHaveProp('style', style)
    })
  })
})
