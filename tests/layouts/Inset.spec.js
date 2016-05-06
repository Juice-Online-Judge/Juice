import React from 'react';
import { shallow } from 'enzyme';
import Inset from 'layouts/Inset';
import { Grid, Row, Col } from 'react-flexbox-grid';

describe('(Layout) <Inset />', () => {
  it('render a <Grid /> component', () => {
    const wrapper = shallow(<Inset />);
    expect(wrapper).to.have.exactly(1).descendants(Grid);
  });

  it('render a <Row /> component', () => {
    const wrapper = shallow(<Inset />);
    expect(wrapper).to.have.exactly(1).descendants(Row);
  });

  it('render a <Col /> component', () => {
    const wrapper = shallow(<Inset />);
    expect(wrapper).to.have.exactly(1).descendants(Col);
  });

  it('render children when passed in', () => {
    const wrapper = shallow(
      <Inset>
        <div className='child' />
      </Inset>
    );
    expect(wrapper).to.contain(<div className='child' />);
  });
});
