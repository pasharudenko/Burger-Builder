import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get(
      'https://test-d4636.firebaseio.com/ingredients.json'
    );

    yield put({
      type: actionTypes.SET_INGREDIENTS,
      ingredients: response.data,
    });
  } catch (e) {
    yield put({
      type: actionTypes.FETCH_INGREDIENTS_FAILED,
    });
  }
}
