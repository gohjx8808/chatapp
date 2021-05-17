import {combineReducers} from 'redux';
import {chatActions, chatActionTypes} from './chatActions';

const INITIAL_STATE: chat.State = {
  messages: [],
  selectedFren: {
    uid: '',
    name: '',
    photoURL: '',
    dob: '',
    email: '',
    gender: '',
    photoName: '',
  },
  chatFrenList: [],
  isDeleteFriendConfirmModalOpen: false,
  isFriendProfilePhotoModalOpen: false,
};

const messages = (
  state = INITIAL_STATE.messages,
  action: chatActionTypes.storeMessagesActionType,
): chat.IMessage[] => {
  switch (action.type) {
    case chatActions.STORE_MESSAGES:
      return action.payload;
    default:
      return state;
  }
};

const selectedFren = (
  state = INITIAL_STATE.selectedFren,
  action: chatActionTypes.loadSelectedFrenActionType,
): frenDetails => {
  switch (action.type) {
    case chatActions.LOAD_SELECTED_FREN:
      return action.payload;
    default:
      return state;
  }
};

const chatFrenList = (
  state = INITIAL_STATE.chatFrenList,
  action: chatActionTypes.loadChatFrenListActionType,
): frenDetails[] => {
  switch (action.type) {
    case chatActions.LOAD_CHAT_FREN_LIST:
      return action.payload;
    default:
      return state;
  }
};

const isDeleteFriendConfirmModalOpen = (
  state = INITIAL_STATE.isDeleteFriendConfirmModalOpen,
  action: chatActionTypes.toggleDeleteFriendConfirmModalActionType,
): boolean => {
  switch (action.type) {
    case chatActions.TOGGLE_DELETE_FIEND_CONFIRM_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const isFriendProfilePhotoModalOpen = (
  state = INITIAL_STATE.isFriendProfilePhotoModalOpen,
  action: chatActionTypes.toggleFriendProfilePhotoActionType,
): boolean => {
  switch (action.type) {
    case chatActions.TOGGLE_FRIEND_PROFILE_PHOTO:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<chat.State>({
  messages,
  selectedFren,
  chatFrenList,
  isDeleteFriendConfirmModalOpen,
  isFriendProfilePhotoModalOpen,
});
