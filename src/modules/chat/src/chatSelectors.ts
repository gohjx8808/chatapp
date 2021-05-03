import {createSelector} from 'reselect';

const chatSelector = (state: GlobalState) => state.chat;

export const messagesSelector = createSelector(
  chatSelector,
  chat => chat.messages,
);

export const selectedFrenSelector = createSelector(
  chatSelector,
  chat => chat.selectedFren,
);
