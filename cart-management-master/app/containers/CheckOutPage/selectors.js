import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkOutPage state domain
 */

const selectCheckOutPageDomain = state => state.checkOutPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CheckOutPage
 */

const makeSelectCheckOutPage = () =>
  createSelector(
    selectCheckOutPageDomain,
    substate => substate,
  );

export default makeSelectCheckOutPage;
export { selectCheckOutPageDomain };
