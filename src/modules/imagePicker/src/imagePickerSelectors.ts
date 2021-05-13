import {createSelector} from 'reselect';

const imagePickerSelector = (state: GlobalState) => state.imagePicker;

export const isImagePickerDialogOpenSelector = createSelector(
  imagePickerSelector,
  imagePicker => imagePicker.isImagePickerDialogOpen,
);
