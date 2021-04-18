/*
 *
 * CartPage actions
 *
 */

import {
  DEFAULT_ACTION,
  BEGIN_REQUEST_CARTS,
  GET_CARTS_SUCCESS,
  GET_CARTS_ERROR,
  BEGIN_REQUEST_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  BEGIN_REQUEST_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  SELECT_CART,
  ADD_TO_CART,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function beginRequestCarts() {
  return {
    type: BEGIN_REQUEST_CARTS,
  };
}

export function getCartsSuccess(data) {
  return {
    type: GET_CARTS_SUCCESS,
    data,
  };
}

export function getCartsError(message) {
  return {
    type: GET_CARTS_ERROR,
    message,
  };
}

export function beginRequestProducts() {
  return {
    type: BEGIN_REQUEST_PRODUCTS,
  };
}

export function getProductsSuccess(data) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    data,
  };
}

export function getProductsError(message) {
  return {
    type: GET_PRODUCTS_ERROR,
    message,
  };
}

export function beginRequestUsers() {
  return {
    type: BEGIN_REQUEST_USERS,
  };
}

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}

export function getUsersError(message) {
  return {
    type: GET_USERS_ERROR,
    message,
  };
}

export function incrementProduct(userId, productId) {
  return {
    type: INCREMENT_PRODUCT,
    userId,
    productId,
  };
}

export function decrementProduct(userId, productId) {
  return {
    type: DECREMENT_PRODUCT,
    userId,
    productId,
  };
}

export function selectCart(cartId) {
  return {
    type: SELECT_CART,
    cartId,
  };
}

export function addToCart(productId) {
  return {
    type: ADD_TO_CART,
    productId,
  };
}
