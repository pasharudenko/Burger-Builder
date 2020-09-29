import axios from 'axios';
import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* logout(action) {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  yield put(actions.logoutSucced());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const autData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtj5QgS0ltUleXu2aSm3Zilw863Nc34t4';

  if (!action.isSignUp) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtj5QgS0ltUleXu2aSm3Zilw863Nc34t4';
  }
  try {
    const response = yield axios.post(url, autData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('expirationDate', expirationDate);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    console.log(err);
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
