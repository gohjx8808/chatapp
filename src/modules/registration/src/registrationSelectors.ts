import {createSelector} from 'reselect';

const registrationSelector = (state: GlobalState) => state.registration;

export const isRegisterLoadingSelector = createSelector(
  registrationSelector,
  registration => registration.isRegisterLoading,
);
