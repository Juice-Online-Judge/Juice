import React from 'react'
import { shallow } from 'enzyme'
import { ToggleDisplay } from 'components/ToggleDisplay'

describe('(Component) <ToggleDisplay />', () => {
  it('Render a <div />', () => {
    const wrapper = shallow(<ToggleDisplay />)
    expect(wrapper).to.have.exactly(1).descendants('div')
  })

  it('Render children when passed in', () => {
    const wrapper = shallow(
      <ToggleDisplay>
        <div className='child' />
      </ToggleDisplay>
    )
    expect(wrapper).to.contain(<div className='child' />)
  })

  describe('(Prop) hide', () => {
    context('When true', () => {
      it('Style is { display: none }', () => {
        const wrapper = shallow(<ToggleDisplay hide />)
        expect(wrapper).to.have.style('display', 'none')
      })
    })

    context('When false', () => {
      it('Style must not have { display: none }', () => {
        const wrapper = shallow(<ToggleDisplay hide={ false } />)
        expect(wrapper).not.to.have.style('display', 'none')
      })
    })
  })

  describe('(Prop) show', () => {
    context('When true', () => {
      it('Style must not have { display: none }', () => {
        const wrapper = shallow(<ToggleDisplay show />)
        expect(wrapper).not.to.have.style('display', 'none')
      })
    })

    context('When false', () => {
      it('Style is { display: none }', () => {
        const wrapper = shallow(<ToggleDisplay show={ false } />)
        expect(wrapper).to.have.style('display', 'none')
      })
    })
  })
})
