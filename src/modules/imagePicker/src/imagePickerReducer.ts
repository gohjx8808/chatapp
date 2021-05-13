import {combineReducers} from 'redux';
import {imagePickerActions, imagePickerActionTypes} from './imagePickerActions';

const INITIAL_STATE: imagePicker.State = {
  isImagePickerDialogOpen: false,
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

export default combineReducers<imagePicker.State>({
  isImagePickerDialogOpen,
});
