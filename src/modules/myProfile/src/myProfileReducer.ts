import {combineReducers} from 'redux';
import {myProfileActions, myProfileActionTypes} from './myProfileActions';

const INITIAL_STATE: myProfile.State = {
  isImagePickerDialogOpen: false,
  isProfileLoading: false,
};

const isImagePickerDialogOpen = (
  state = INITIAL_STATE.isImagePickerDialogOpen,
  action: myProfileActionTypes.toggleImagePickerDialogActionType,
): boolean => {
  switch (action.type) {
    case myProfileActions.TOGGLE_IMAGE_PICKER_DIALOG:
      return action.payload;
    default:
      return state;
  }
};

const isProfileLoading = (
  state = INITIAL_STATE.isProfileLoading,
  action: myProfileActionTypes.toggleProfileLoadingActionType,
): boolean => {
  switch (action.type) {
    case myProfileActions.TOGGLE_PROFILE_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<myProfile.State>({
  isImagePickerDialogOpen,
  isProfileLoading,
});
