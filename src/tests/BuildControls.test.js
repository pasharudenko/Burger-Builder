import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuildControls from '../components/Burger/BuildControls/BuildControls';

configure({
  adapter: new Adapter()
});

describe('<BuildControls />', () => {
  let wrapper;

  it('should be sign up button when is not authenticated', () => {
    wrapper = shallow(<BuildControls price={2} disabled={true} />);
    expect(wrapper.find('button').text()).toEqual('SIGN UP TO ORDER');
  });

  it('should be order button when is not authenticated', () => {
    wrapper = shallow(
      <BuildControls isAuth={true} price={2} disabled={true} />
    );
    expect(wrapper.find('button').text()).toEqual('ORDER NOW');
  });
});
