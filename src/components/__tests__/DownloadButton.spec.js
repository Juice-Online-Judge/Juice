import React from 'react'
import { shallow } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'
import { DownloadButton } from '../DownloadButton'
import FlatButton from 'material-ui/FlatButton'

describe('(Component) <DownloadButton />', () => {
  let sut

  beforeEach(() => {
    jasmineEnzyme()
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

    describe('When have text', () => {
      it('Render <FlatButton /> with link', () => {
        const url = `data:text/plain;base64,${btoa('foo')}`
        const sut = shallow(<DownloadButton label='test' text='foo' />)

        expect(sut.find(FlatButton).first()).toHaveProp('href', url)
        expect(sut.find(FlatButton).first()).toHaveProp('disabled', false)
      })
    })
  })

  describe('(Prop) filename', () => {
    describe('When no filename', () => {
      it('Render <FlatButton /> with default filename', () => {
        const sut = shallow(<DownloadButton label='test' text='foo' />)

        expect(sut.find(FlatButton).first()).toHaveProp('download', 'download')
      })
    })

    describe('When have filename', () => {
      it('Render <FlatButton /> with filename', () => {
        const sut = shallow(<DownloadButton label='test' text='foo' filename='bar' />)

        expect(sut.find(FlatButton).first()).toHaveProp('download', 'bar')
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
