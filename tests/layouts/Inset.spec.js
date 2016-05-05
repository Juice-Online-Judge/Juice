import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Inset from 'layouts/Inset';
import { Grid, Row, Col } from 'react-flexbox-grid';

describe('<Inset />', () => {
  it('render <Grid /> component', () => {
    const wrapper = shallow(<Inset />);
    expect(wrapper.find(Grid)).to.have.lengthOf(1);
  });

  it('render <Row /> component', () => {
    const wrapper = shallow(<Inset />);
    expect(wrapper.find(Row)).to.have.lengthOf(1);
  });

  it('render <Col /> component', () => {
    const wrapper = shallow(<Inset />);
    expect(wrapper.find(Col)).to.have.lengthOf(1);
  });
});
