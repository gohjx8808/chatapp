import {combineReducers} from 'redux';
import {myProfileActions, myProfileActionTypes} from './myProfileActions';

const INITIAL_STATE: myProfile.State = {
  isImagePickerDialogOpen: false,
};

const isImagePickerDialogOpen = (
  state = INITIAL_STATE.isImagePickerDialogOpen,
  action: myProfileActionTypes.toggleImagePickerDialog,
): boolean => {
  switch (action.type) {
    case myProfileActions.TOGGLE_IMAGE_PICKER_DIALOG:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({isImagePickerDialogOpen});
