import React from 'react';
import { shallow } from 'enzyme';
import { CenterLoading } from 'components/CenterLoading';
import { Row, Col } from 'react-flexbox-grid';
import RefreshIndicator from 'material-ui/RefreshIndicator';

describe('(Component) <CenterLoading />', () => {
  it('Render <Row /> with prop center', () => {
    const wrapper = shallow(<CenterLoading status='hide' left={ 10 } />);
    expect(wrapper).to.have.exactly(1).descendants(Row);
    expect(wrapper.find(Row).first()).to.have.prop('center', 'xs');
  });

  it('Render <Col />', () => {
    const wrapper = shallow(<CenterLoading status='hide' left={ 10 } />);
    expect(wrapper).to.have.exactly(1).descendants(Col);
  });

  it('Render <RefreshIndicator />', () => {
    const wrapper = shallow(<CenterLoading status='hide' left={ 10 } />);
    expect(wrapper).to.have.exactly(1).descendants(RefreshIndicator);
  });
});
