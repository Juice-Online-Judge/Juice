import React from 'react';
import { shallow } from 'enzyme';
import CenterBlock from 'layouts/CenterBlock';
import { Grid, Row, Col } from 'react-flexbox-grid';

describe('(Layout) <CenterBlock />', () => {
  it('Render a <Grid /> component', () => {
    const wrapper = shallow(<CenterBlock />);
    expect(wrapper).to.have.exactly(1).descendants(Grid);
  });

  it('Render a <Row /> component', () => {
    const wrapper = shallow(<CenterBlock />);
    expect(wrapper).to.have.exactly(1).descendants(Row);
  });

  it('Render a <Col /> component', () => {
    const wrapper = shallow(<CenterBlock />);
    expect(wrapper).to.have.exactly(1).descendants(Col);
  });

  it('Render children when passed in', () => {
    const wrapper = shallow(
      <CenterBlock>
        <div className='child' />
      </CenterBlock>
    );
    expect(wrapper).to.contain(<div className='child' />);
  });

  describe('(Prop) fullwidth', () => {
    context('When not fullwidth', () => {
      it('Render <Col /> with md={ 6 }', () => {
        const wrapper = shallow(<CenterBlock />);
        expect(wrapper.find(Col).first()).to.have.prop('md', 6);
      });
    });

    context('When fullwidth', () => {
      it('Render <Col /> with md={ 12 }', () => {
        const wrapper = shallow(<CenterBlock fullwidth />);
        expect(wrapper.find(Col).first()).to.have.prop('md', 12);
      });
    });
  });
});
