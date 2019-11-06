import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from '../containers/BurgerBuilder/BurgerBuilder';
import BuildControls from '../components/Burger/BuildControls/BuildControls';

configure({
  adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder ingredeintsInit={() => {}} />);
  });

  it('should rendre <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({
      ings: {
        salad: 0
      }
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

  it('should trigger redirect', () => {
    const mockHistoryPush = jest.fn();

    wrapper.setProps({
      ings: {
        salad: 0
      },
      price: 0,
      onSetAuthRedirectPath: () => {},
      history: { push: mockHistoryPush }
    });

    wrapper
      .find(BuildControls)
      .dive()
      .find('button')
      .simulate('click');
    expect(mockHistoryPush).toHaveBeenCalled();
  });

  it('should redirect to /auth', () => {
    const mockHistoryPush = jest.fn();

    wrapper.setProps({
      ings: {
        salad: 0
      },
      price: 0,
      onSetAuthRedirectPath: () => {},
      history: { push: mockHistoryPush }
    });

    wrapper
      .find(BuildControls)
      .dive()
      .find('button')
      .simulate('click');
    expect(mockHistoryPush.mock.calls[0][0]).toEqual('/auth');
  });
});
