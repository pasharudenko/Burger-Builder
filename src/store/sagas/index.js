import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  logout,
  checkAuthTimeoutSaga,
  authSaga,
  authCheckStateSaga,
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logout),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}
export function* watchBurgerBuilder() {
  yield takeLatest(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield all([
    takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga),
  ]);
}
