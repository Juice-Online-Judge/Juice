import React from 'react';
import { shallow } from 'enzyme';
import { CenterLoading } from 'components/CenterLoading';
import { Row, Col } from 'react-flexbox-grid';
import RefreshIndicator from 'material-ui/RefreshIndicator';

describe('(Component) <CenterLoading />', () => {
  it('Render <Row /> with prop center', () => {
    const wrapper = shallow(<CenterLoading loading={ false } left={ 10 } />);
    expect(wrapper).to.have.exactly(1).descendants(Row);
    expect(wrapper.find(Row).first()).to.have.prop('center', 'xs');
  });

  it('Render <Col />', () => {
    const wrapper = shallow(<CenterLoading loading={ false } left={ 10 } />);
    expect(wrapper).to.have.exactly(1).descendants(Col);
  });

  it('Render <RefreshIndicator />', () => {
    const wrapper = shallow(<CenterLoading loading={ false } left={ 10 } />);
    expect(wrapper).to.have.exactly(1).descendants(RefreshIndicator);
  });

  describe('(Prop) loading', () => {
    context('When false', () => {
      it('Render <RefreshIndicator status="hide" />', () => {
        const wrapper = shallow(<CenterLoading loading={ false } left={ 10 } />);
        expect(wrapper.find(RefreshIndicator)).to.have.prop('status', 'hide');
      });
    });

    context('When true', () => {
      it('Render <RefreshIndicator status="loading" />', () => {
        const wrapper = shallow(<CenterLoading loading left={ 10 } />);
        expect(wrapper.find(RefreshIndicator)).to.have.prop('status', 'loading');
      });
    });
  });

  describe('(Prop) left', () => {
    it('Pass to <RefreshIndicator />', () => {
      const wrapper = shallow(<CenterLoading loading={ false } left={ 10 } />);
      expect(wrapper.find(RefreshIndicator)).to.have.prop('left', 10);
      wrapper.setProps({ left: 20 });
      expect(wrapper.find(RefreshIndicator)).to.have.prop('left', 20);
    });
  });
});
