import {createSelector} from 'reselect';

const loginSelector = (state: GlobalState) => state.login;

export const currentUserSelector = createSelector(
  loginSelector,
  login => login.currentUser,
);
