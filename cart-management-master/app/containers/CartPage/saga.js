/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import api from 'utils/ApiClient';
import {
  getCartsError,
  getCartsSuccess,
  getProductsError,
  getProductsSuccess,
  getUsersSuccess,
  getUsersError,
} from './actions';
import {
  BEGIN_REQUEST_CARTS,
  BEGIN_REQUEST_PRODUCTS,
  BEGIN_REQUEST_USERS,
} from './constants';

export function* getCarts() {
  return yield api.get(`carts`);
}

export function* getProducts() {
  return yield api.get(`products`);
}

export function* getUsers() {
  return yield api.get(`users`);
}

export function* getCartsFlow() {
  try {
    const { status, data } = yield call(getCarts);
    status === 200
      ? yield put(getCartsSuccess(data))
      : yield put(getCartsError('loi'));
  } catch (err) {
    yield put(getCartsError('loi'));
  }
}

export function* getProductsFlow() {
  try {
    const { status, data } = yield call(getProducts);
    status === 200
      ? yield put(getProductsSuccess(data))
      : yield put(getProductsError('loi'));
  } catch (err) {
    yield put(getProductsError('loi'));
  }
}

export function* getUsersFlow() {
  try {
    const { status, data } = yield call(getUsers);
    status === 200
      ? yield put(getUsersSuccess(data))
      : yield put(getUsersError('loi'));
  } catch (err) {
    yield put(getUsersError('loi'));
  }
}

// Individual exports for testing
export default function* cartPageSaga() {
  yield takeLatest(BEGIN_REQUEST_CARTS, getCartsFlow);
  yield takeLatest(BEGIN_REQUEST_PRODUCTS, getProductsFlow);
  yield takeLatest(BEGIN_REQUEST_USERS, getUsersFlow);
}
