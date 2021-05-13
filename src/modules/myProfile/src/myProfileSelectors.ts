import {createSelector} from 'reselect';

const myProfileSelector = (state: GlobalState) => state.myProfile;

export const isProfileLoadingSelector = createSelector(
  myProfileSelector,
  myProfile => myProfile.isProfileLoading,
);
