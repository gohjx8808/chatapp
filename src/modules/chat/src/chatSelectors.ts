import {createSelector} from 'reselect';

const chatSelector = (state: GlobalState) => state.chat;

export const messagesSelector = createSelector(
  chatSelector,
  chat => chat.messages,
);

export const frenListSelector = createSelector(
  chatSelector,
  chat => chat.frenList,
);

export const selectedFrenSelector = createSelector(
  chatSelector,
  chat => chat.selectedFren,
);

export const isAddFrenModalOpenSelector = createSelector(
  chatSelector,
  chat => chat.isAddFrenModalOpen,
);
