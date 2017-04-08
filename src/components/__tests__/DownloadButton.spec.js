import React from 'react'
import {shallow} from 'enzyme'
import {DownloadButton} from '../DownloadButton'
import FlatButton from 'material-ui/FlatButton'

describe('(Component) <DownloadButton />', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<DownloadButton label='test' />)
  })

  it('Render <FlatButton />', () => {
    expect(sut.find(FlatButton).length).toBe(1)
  })

  describe('(Prop) text', () => {
    describe('When no text', () => {
      it('Render <FlatButton disabled />', () => {
        expect(sut.find(FlatButton).first()).toHaveProp('disabled', true)
      })
    })
  })

  describe('(Prop) disabled', () => {
    it('Render <FlatButton disabled />', () => {
      const sut = shallow(<DownloadButton label='test' text='foo' disabled />)

      expect(sut.find(FlatButton).first()).toHaveProp('disabled', true)
    })
  })
})
