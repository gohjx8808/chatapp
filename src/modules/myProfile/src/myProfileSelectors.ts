import {createSelector} from 'reselect';

const myProfileSelector = (state: GlobalState) => state.myProfile;

export const isImagePickerDialogOpenSelector = createSelector(
  myProfileSelector,
  myProfile => myProfile.isImagePickerDialogOpen,
);

export const isProfileLoadingSelector = createSelector(
  myProfileSelector,
  myProfile => myProfile.isProfileLoading,
);
