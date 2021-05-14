import {combineReducers} from 'redux';
import {imagePickerActions, imagePickerActionTypes} from './imagePickerActions';

const INITIAL_STATE: imagePicker.State = {
  isImagePickerDialogOpen: false,
  imagePickerDialogTitle: '',
  isCropping: true,
};

const isImagePickerDialogOpen = (
  state = INITIAL_STATE.isImagePickerDialogOpen,
  action: imagePickerActionTypes.toggleImagePickerDialogActionType,
): boolean => {
  switch (action.type) {
    case imagePickerActions.TOGGLE_IMAGE_PICKER_DIALOG:
      return action.payload;
    default:
      return state;
  }
};

const imagePickerDialogTitle = (
  state = INITIAL_STATE.imagePickerDialogTitle,
  action: imagePickerActionTypes.updateImagePickerDialogTitleActionType,
): string => {
  switch (action.type) {
    case imagePickerActions.UPDATE_IMAGE_PICKER_DIALOG_TITLE:
      return action.payload;
    default:
      return state;
  }
};

const isCropping = (
  state = INITIAL_STATE.isCropping,
  action: imagePickerActionTypes.toggleIsCroppingActionType,
): boolean => {
  switch (action.type) {
    case imagePickerActions.TOGGLE_IS_CROPPING:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<imagePicker.State>({
  isImagePickerDialogOpen,
  imagePickerDialogTitle,
  isCropping,
});
