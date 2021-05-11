import {createSelector} from 'reselect';

const logoutSelector = (state: GlobalState) => state.logout;

export const isLogoutLoadingSelector = createSelector(
  logoutSelector,
  logout => logout.isLogoutLoading,
);
