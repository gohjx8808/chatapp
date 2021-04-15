import {createSelector} from 'reselect';

const loginSelector = (state: GlobalState) => state.login;

export const isLoginLoadingSelector = createSelector(
  loginSelector,
  login => login.isLoginLoading,
);
