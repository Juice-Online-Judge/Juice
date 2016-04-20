import { createSelector } from 'reselect';

const getTotal = (state) => state.get('total');

export const createMaxPageSelector = (perPage = 10) => {
  return createSelector([getTotal], (total) => {
    return Math.ceil(total / perPage);
  });
};

export default createMaxPageSelector;
