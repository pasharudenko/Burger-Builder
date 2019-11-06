import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Auth } from '../containers/Auth/Auth';
import reducer from '../store/reducers/auth';
import * as actionTypes from '../store/actions/actionTypes';

configure({
  adapter: new Adapter()
});

describe('<Auth />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Auth onSetAuthRedirectPath={() => {}} />);
  });

  it('should trigger sign in and sign up', () => {
    wrapper
      .find('button[btnType="Danger"]')
      .dive()
      .simulate('click');
    expect(wrapper.state().isSignUp).toBeFalsy();
  });
});

describe('Auth Reducer', () => {
  it('should return inityial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: 'some-user-token',
          userId: 'some-user-id',
          error: null,
          loading: false,
          authRedirectPath: '/'
        },
        actionTypes.AUTH_SUCCESS
      )
    ).toEqual({
      token: 'some-user-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });
});
