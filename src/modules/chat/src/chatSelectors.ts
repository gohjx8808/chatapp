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

export const chatFrenListSelector = createSelector(
  chatSelector,
  chat => chat.chatFrenList,
);

export const isDeleteFriendConfirmModalOpenSelector = createSelector(
  chatSelector,
  chat => chat.isDeleteFriendConfirmModalOpen,
);

export const isChatLoadingSelector = createSelector(
  chatSelector,
  chat => chat.isChatLoading,
);
