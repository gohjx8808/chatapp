import {combineReducers} from 'redux';
import {chatActions, chatActionTypes} from './chatActions';

const INITIAL_STATE: chat.State = {
  messages: [],
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

export default combineReducers<chat.State>({
  messages,
});
