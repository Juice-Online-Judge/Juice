import React from 'react';
import { shallow } from 'enzyme';
import { TitleCard } from 'components/TitleCard';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';

describe('(Component) <TitleCard />', () => {
  it('Render <Card />', () => {
    const wrapper = shallow(<TitleCard />);
    expect(wrapper).to.have.exactly(1).descendants(Card);
  });

  it('Render <CardTitle />', () => {
    const wrapper = shallow(<TitleCard />);
    expect(wrapper).to.have.exactly(1).descendants(CardTitle);
  });

  it('Render children when passed in', () => {
    const wrapper = shallow(
      <TitleCard>
        <div className='child' />
      </TitleCard>
    );
    expect(wrapper).to.contain(<div className='child' />);
  });

  describe('(Prop) title', () => {
    it('Pass to <CardTitle />', () => {
      const wrapper = shallow(<TitleCard title='foo' />);
      expect(wrapper.find(CardTitle)).to.have.prop('title', 'foo');
    });
  });

  describe('(Prop) subtitle', () => {
    it('Pass to <CardTitle />', () => {
      const wrapper = shallow(<TitleCard subtitle='foo' />);
      expect(wrapper.find(CardTitle)).to.have.prop('subtitle', 'foo');
    });
  });

  describe('(Prop) style', () => {
    it('Pass to <CardTitle />', () => {
      const style = { foo: 'bar' };
      const wrapper = shallow(<TitleCard style={ style } />);
      expect(wrapper.find(CardTitle)).to.have.prop('style', style);
    });
  });
});
