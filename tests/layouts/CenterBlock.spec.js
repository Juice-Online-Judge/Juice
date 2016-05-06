import React from 'react';
import { shallow } from 'enzyme';
import CenterBlock from 'layouts/CenterBlock';
import { Grid, Row, Col } from 'react-flexbox-grid';

describe('(Layout) <CenterBlock />', () => {
  it('render a <Grid /> component', () => {
    const wrapper = shallow(<CenterBlock />);
    expect(wrapper).to.have.exactly(1).descendants(Grid);
  });

  it('render a <Row /> component', () => {
    const wrapper = shallow(<CenterBlock />);
    expect(wrapper).to.have.exactly(1).descendants(Row);
  });

  it('render a <Col /> component', () => {
    const wrapper = shallow(<CenterBlock />);
    expect(wrapper).to.have.exactly(1).descendants(Col);
  });

  it('render children when passed in', () => {
    const wrapper = shallow(
      <CenterBlock>
        <div className='child' />
      </CenterBlock>
    );
    expect(wrapper).to.contain(<div className='child' />);
  });

  describe('(prop) fullwidth', () => {
    context('when not fullwidth', () => {
      it('render <Col /> with md={ 6 }', () => {
        const wrapper = shallow(<CenterBlock />);
        expect(wrapper.find(Col).first()).to.have.prop('md', 6);
      });
    });

    context('when fullwidth', () => {
      it('render <Col /> with md={ 12 }', () => {
        const wrapper = shallow(<CenterBlock fullwidth />);
        expect(wrapper.find(Col).first()).to.have.prop('md', 12);
      });
    });
  });

});
