/* eslint-disable no-redeclare */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
/*
 *
 * CartPage reducer
 *
 */
import produce from 'immer';
import ld from 'lodash';
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

export const initialState = {
  isLoading: false,
  carts: [],
  products: [],
  users: [],
  cartSelected: '',
};

/* eslint-disable default-case, no-param-reassign */
const cartPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    let carts = [];
    let cartIndex = -1;
    let productIndex = -1;
    switch (action.type) {
      case BEGIN_REQUEST_CARTS:
        draft.isLoading = true;
        break;
      case GET_CARTS_SUCCESS:
        for (let index = 0; index < action.data.length; index++) {
          if (!ld.find(carts, o => o.userId === action.data[index].userId)) {
            action.data[index].id = carts.length + 1;
            action.data[index].products.map(product => {
              product.status = 'exist';
              return product;
            });
            carts.push(action.data[index]);
          }
        }
        draft.isLoading = false;
        draft.carts = carts;
        break;
      case GET_CARTS_ERROR:
        draft.isLoading = false;
        break;
      case BEGIN_REQUEST_PRODUCTS:
        draft.isLoading = true;
        break;
      case GET_PRODUCTS_SUCCESS:
        draft.isLoading = false;
        draft.products = action.data;
        break;
      case GET_PRODUCTS_ERROR:
        draft.isLoading = false;
        break;
      case BEGIN_REQUEST_USERS:
        draft.isLoading = true;
        break;
      case GET_USERS_SUCCESS:
        draft.isLoading = false;
        draft.users = action.data;
        break;
      case GET_USERS_ERROR:
        draft.isLoading = false;
        break;
      case INCREMENT_PRODUCT:
        cartIndex = ld.findIndex(draft.carts, { userId: action.userId });
        productIndex = ld.findIndex(draft.carts[cartIndex].products, {
          productId: action.productId,
        });
        draft.carts[cartIndex].products[productIndex].quantity += 1;
        break;
      case DECREMENT_PRODUCT:
        cartIndex = ld.findIndex(draft.carts, { userId: action.userId });
        productIndex = ld.findIndex(draft.carts[cartIndex].products, {
          productId: action.productId,
        });
        draft.carts[cartIndex].products[productIndex].quantity -= 1;
        break;
      case SELECT_CART:
        draft.cartSelected = action.cartId;
        break;
      case ADD_TO_CART:
        cartIndex = ld.findIndex(draft.carts, { id: draft.cartSelected });
        productIndex = ld.findIndex(draft.carts[cartIndex].products, {
          productId: action.productId,
        });

        if (productIndex > -1) {
          draft.carts[cartIndex].products[productIndex].quantity += 1;
        } else {
          draft.carts[cartIndex].products.push({
            productId: action.productId,
            quantity: 1,
            status: 'new',
          });
        }
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default cartPageReducer;
