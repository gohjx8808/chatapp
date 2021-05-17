import {createSelector} from 'reselect';

const friendSelector = (state: GlobalState) => state.friend;

export const isAddFriendModalOpenSelector = createSelector(
  friendSelector,
  friend => friend.isAddFriendModalOpen,
);

export const friendListSelector = createSelector(
  friendSelector,
  friend => friend.friendList,
);
