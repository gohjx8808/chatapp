import {combineReducers} from 'redux';
import {chatActions, chatActionTypes} from './chatActions';

const INITIAL_STATE: chat.State = {
  messages: [],
  chatFrenList: [],
  selectedFren: {
    uid: '',
    name: '',
    photoURL: '',
  },
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

const chatFrenList = (
  state = INITIAL_STATE.chatFrenList,
  action: chatActionTypes.loadChatFrenListActionType,
): frenData[] => {
  switch (action.type) {
    case chatActions.LOAD_CHAT_FREN_LIST:
      return [...state, action.payload];
    default:
      return state;
  }
};

const selectedFren = (
  state = INITIAL_STATE.selectedFren,
  action: chatActionTypes.loadSelectedFrenActionType,
): frenData => {
  switch (action.type) {
    case chatActions.LOAD_SELECTED_FREN:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<chat.State>({
  messages,
  chatFrenList,
  selectedFren,
});
