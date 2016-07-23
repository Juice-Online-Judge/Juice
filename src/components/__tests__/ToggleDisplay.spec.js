jest.unmock('../ToggleDisplay')

import React from 'react'
import { shallow } from 'enzyme'
import { ToggleDisplay } from '../ToggleDisplay'

describe('(Component) <ToggleDisplay />', () => {
  it('Render a <div />', () => {
    const sut = shallow(<ToggleDisplay />)
    expect(sut.find('div').length).toBe(1)
  })

  it('Render children when passed in', () => {
    const sut = shallow(
      <ToggleDisplay>
        <div className='child' />
      </ToggleDisplay>
    )
    expect(sut).toContainReact(<div className='child' />)
  })

  describe('(Prop) hide', () => {
    describe('When true', () => {
      it('Style is { display: none }', () => {
        const sut = shallow(<ToggleDisplay hide />)
        expect(sut).toHaveStyle('display', 'none')
      })
    })

    describe('When false', () => {
      it('Style must not have { display: none }', () => {
        const sut = shallow(<ToggleDisplay hide={ false } />)
        expect(sut).not.toHaveStyle('display', 'none')
      })
    })
  })

  describe('(Prop) show', () => {
    describe('When true', () => {
      it('Style must not have { display: none }', () => {
        const sut = shallow(<ToggleDisplay show />)
        expect(sut).not.toHaveStyle('display', 'none')
      })
    })

    describe('When false', () => {
      it('Style is { display: none }', () => {
        const sut = shallow(<ToggleDisplay show={ false } />)
        expect(sut).toHaveStyle('display', 'none')
      })
    })
  })
})
