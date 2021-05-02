import {createSelector} from 'reselect';

const chatSelector = (state: GlobalState) => state.chat;

export const messagesSelector = createSelector(
  chatSelector,
  chat => chat.messages,
);

export const chatFrenListSelector = createSelector(
  chatSelector,
  chat => chat.chatFrenList,
);

export const selectedFrenSelector = createSelector(
  chatSelector,
  chat => chat.selectedFren,
);

export const isAddFrenModalOpenSelector = createSelector(
  chatSelector,
  chat => chat.isAddFrenModalOpen,
);
