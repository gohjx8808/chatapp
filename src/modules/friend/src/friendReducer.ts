import {combineReducers} from 'redux';
import {friendActions, friendActionTypes} from './friendActions';

const INITIAL_STATE: friend.State = {
  isAddFriendModalOpen: false,
  isFriendLoading: false,
  friendList: [],
};

const isAddFriendModalOpen = (
  state = INITIAL_STATE.isAddFriendModalOpen,
  action: friendActionTypes.toggleAddFriendModalActionType,
): boolean => {
  switch (action.type) {
    case friendActions.TOGGLE_ADD_FRIEND_MODAL:
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

const friendList = (
  state = INITIAL_STATE.friendList,
  action: friendActionTypes.loadFriendListActionType,
): frenDetails[] => {
  switch (action.type) {
    case friendActions.LOAD_FRIEND_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<friend.State>({
  isAddFriendModalOpen,
  isFriendLoading,
  friendList,
});
