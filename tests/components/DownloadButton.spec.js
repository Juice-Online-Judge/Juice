import React from 'react';
import { shallow } from 'enzyme';
import { DownloadButton } from 'components/DownloadButton';
import FlatButton from 'material-ui/FlatButton';

describe('(Component) <DownloadButton />', () => {
  it('render <FlatButton />', () => {
    const wrapper = shallow(<DownloadButton label='test' />);
    expect(wrapper).to.have.exactly(1).descendants(FlatButton);
  });

  describe('(prop) text', () => {
    context('when no text', () => {
      it('render <FlatButton disabled />', () => {
        const wrapper = shallow(<DownloadButton label='test' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('disabled', true);
        expect(wrapper.find(FlatButton).first()).to.not.have.prop('linkButton');
      });
    });

    context('when have text', () => {
      it('render <FlatButton /> with link', () => {
        const url = `data:text/plain;base64,${btoa('foo')}`;
        const wrapper = shallow(<DownloadButton label='test' text='foo' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('linkButton', true);
        expect(wrapper.find(FlatButton).first()).to.have.prop('href', url);
        expect(wrapper.find(FlatButton).first()).to.have.prop('disabled', false);
      });
    });
  });

  describe('(prop) filename', () => {
    context('when no filename', () => {
      it('render <FlatButton /> with default filename', () => {
        const wrapper = shallow(<DownloadButton label='test' text='foo' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('download', 'download');
      });
    });

    context('when have filename', () => {
      it('render <FlatButton /> with filename', () => {
        const wrapper = shallow(<DownloadButton label='test' text='foo' filename='bar' />);
        expect(wrapper.find(FlatButton).first()).to.have.prop('download', 'bar');
      });
    });
  });
});
