import assert from 'assert';
import React from 'react';
import { mount, render, shallow } from 'enzyme';

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    );
  }
}

describe('(Framework) Karma Plugins', () => {
  it('Expose "expect" globally.', () => {
    assert.ok(expect);
  });

  it('Expose "should" globally.', () => {
    assert.ok(should);
  });

  it('Have chai-as-promised helpers.', () => {
    const pass = new Promise(res => res('test'));
    const fail = new Promise((res, rej) => rej());

    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ]);
  });

  it('Have chai-enzyme working', () => {
    let wrapper = shallow(<Fixture />);
    expect(wrapper.find('#checked')).to.be.checked();

    wrapper = mount(<Fixture />);
    expect(wrapper.find('#checked')).to.be.checked();

    wrapper = render(<Fixture />);
    expect(wrapper.find('#checked')).to.be.checked();
  });
});
