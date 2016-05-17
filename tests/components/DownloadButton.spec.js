import React from 'react';
import { shallow } from 'enzyme';
import { DownloadButton } from 'components/DownloadButton';
import FlatButton from 'material-ui/FlatButton';

describe('(Component) <DownloadButton />', () => {
  it('Render <FlatButton />', () => {
    const wrapper = shallow(<DownloadButton label='test' />);
    expect(wrapper).to.have.exactly(1).descendants(FlatButton);
  });

  describe('(Prop) text', () => {
    context('When no text', () => {
      it('Render <FlatButton disabled />', () => {
        const wrapper = shallow(<DownloadButton label='test' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('disabled', true);
        expect(wrapper.find(FlatButton).first()).to.not.have.prop('linkButton');
      });
    });

    context('When have text', () => {
      it('Render <FlatButton /> with link', () => {
        const url = `data:text/plain;base64,${btoa('foo')}`;
        const wrapper = shallow(<DownloadButton label='test' text='foo' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('linkButton', true);
        expect(wrapper.find(FlatButton).first()).to.have.prop('href', url);
        expect(wrapper.find(FlatButton).first()).to.have.prop('disabled', false);
      });
    });
  });

  describe('(Prop) filename', () => {
    context('When no filename', () => {
      it('Render <FlatButton /> with default filename', () => {
        const wrapper = shallow(<DownloadButton label='test' text='foo' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('download', 'download');
      });
    });

    context('When have filename', () => {
      it('Render <FlatButton /> with filename', () => {
        const wrapper = shallow(<DownloadButton label='test' text='foo' filename='bar' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('download', 'bar');
      });
    });
  });

  describe('(Prop) disabled', () => {
    it('Render <FlatButton disabled />', () => {
      const wrapper = shallow(<DownloadButton label='test' text='foo' disabled />);
      expect(wrapper.find(FlatButton).first()).to.have.prop('disabled', true);
      expect(wrapper.find(FlatButton).first()).to.not.have.prop('linkButton');
    });
  });
});
