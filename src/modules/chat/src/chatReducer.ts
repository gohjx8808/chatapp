import {combineReducers} from 'redux';
import {chatActions, chatActionTypes} from './chatActions';

const INITIAL_STATE: chat.State = {
  messages: [],
  frenList: [],
  selectedFren: '',
};

const messages = (
  state = INITIAL_STATE.messages,
  action: chatActionTypes.storeMessagesActionType,
): chat.IMessage[] => {
  switch (action.type) {
    case chatActions.STORE_MESSAGES:
      return [action.payload, ...state];
    default:
      return state;
  }
};

const frenList = (
  state = INITIAL_STATE.frenList,
  action: chatActionTypes.loadFrenListActionType,
): chat.frenData[] => {
  switch (action.type) {
    case chatActions.LOAD_FREN_LIST:
      return [...state, action.payload];
    default:
      return state;
  }
};

const selectedFren = (
  state = INITIAL_STATE.selectedFren,
  action: chatActionTypes.loadSelectedFrenActionType,
): string => {
  switch (action.type) {
    case chatActions.LOAD_SELECTED_FREN:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<chat.State>({
  messages,
  frenList,
  selectedFren,
});
