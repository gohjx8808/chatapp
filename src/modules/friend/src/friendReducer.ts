import {combineReducers} from 'redux';
import {friendActions, friendActionTypes} from './friendActions';

const INITIAL_STATE: friend.State = {
  isAddFrenModalOpen: false,
  isFriendLoading: false,
};

const isAddFrenModalOpen = (
  state = INITIAL_STATE.isAddFrenModalOpen,
  action: friendActionTypes.toggleAddFrenModalActionType,
): boolean => {
  switch (action.type) {
    case friendActions.TOGGLE_ADD_FREN_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const isFriendLoading = (
  state = INITIAL_STATE.isFriendLoading,
  action: friendActionTypes.toggleFriendLoadingActionType,
): boolean => {
  switch (action.type) {
    case friendActions.TOGGLE_FRIEND_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<friend.State>({
  isAddFrenModalOpen,
  isFriendLoading,
});
