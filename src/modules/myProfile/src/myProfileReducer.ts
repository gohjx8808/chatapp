import {combineReducers} from 'redux';
import {myProfileActions, myProfileActionTypes} from './myProfileActions';

const INITIAL_STATE: myProfile.State = {
  isDeleteAccConfirmModalOpen: false,
};

const isDeleteAccConfirmModalOpen = (
  state = INITIAL_STATE.isDeleteAccConfirmModalOpen,
  action: myProfileActionTypes.toggleDeleteAccModalActionType,
) => {
  switch (action.type) {
    case myProfileActions.TOGGLE_DELETE_ACC_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<myProfile.State>({isDeleteAccConfirmModalOpen});
