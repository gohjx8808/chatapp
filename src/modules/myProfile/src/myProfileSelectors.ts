import {createSelector} from 'reselect';

const myProfileSelector = (state: GlobalState) => state.myProfile;

export const isImagePickerDialogOpenSelector = createSelector(
  myProfileSelector,
  myProfile => myProfile.isImagePickerDialogOpen,
);
