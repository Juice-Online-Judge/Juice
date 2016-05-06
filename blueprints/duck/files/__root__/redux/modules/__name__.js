import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

const <%= pascalEntityName %>State = new Record({
});

export const initialState = new <%= pascalEntityName %>State();

// Constants
// export const constants = { }

// Action Creators
// export const actions = { }

// Reducer
export default handleActions({
}, initialState);
