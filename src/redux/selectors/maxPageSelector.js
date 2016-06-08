import { createSelector } from 'reselect'

const getTotal = (state) => state.get('total')

export const createMaxPageSelector = (perPage = 10) => createSelector(
  [getTotal],
  (total) => Math.ceil(total / perPage)
)

export default createMaxPageSelector
