import {createSelector} from 'reselect';

const imagePickerSelector = (state: GlobalState) => state.imagePicker;

export const isImagePickerDialogOpenSelector = createSelector(
  imagePickerSelector,
  imagePicker => imagePicker.isImagePickerDialogOpen,
);

export const imagePickerDialogTitleSelector = createSelector(
  imagePickerSelector,
  imagePicker => imagePicker.imagePickerDialogTitle,
);

export const isCroppingSelector = createSelector(
  imagePickerSelector,
  imagePicker => imagePicker.isCropping,
);

export const uploadedPhotoSelector = createSelector(
  imagePickerSelector,
  imagePicker => imagePicker.uploadedPhoto,
);
