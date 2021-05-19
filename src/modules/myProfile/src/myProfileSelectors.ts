import {createSelector} from 'reselect';

const myProfileSelector = (state: GlobalState) => state.myProfile;

export const isDeleteAccConfirmModalOpenSelector = createSelector(
  myProfileSelector,
  myProfile => myProfile.isDeleteAccConfirmModalOpen,
);
