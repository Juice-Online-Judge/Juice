import React from 'react';
import { shallow } from 'enzyme';
import CenterBlock from 'layouts/CenterBlock';
import { Grid, Row, Col } from 'react-flexbox-grid';

describe('<CenterBlock />', () => {
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
});
