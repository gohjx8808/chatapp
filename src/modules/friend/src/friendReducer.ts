import {combineReducers} from 'redux';
import {friendActions, friendActionTypes} from './friendActions';

const INITIAL_STATE: friend.State = {
  isAddFrenModalOpen: false,
};

const isAddFrenModalOpen = (
  state = INITIAL_STATE.isAddFrenModalOpen,
  action: friendActionTypes.toggleAddFrenModalActionType,
) => {
  switch (action.type) {
    case friendActions.TOGGLE_ADD_FREN_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<friend.State>({isAddFrenModalOpen});
