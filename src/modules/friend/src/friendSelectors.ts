import {createSelector} from 'reselect';

const friendSelector = (state: GlobalState) => state.friend;

export const isAddFrenModalOpenSelector = createSelector(
  friendSelector,
  friend => friend.isAddFrenModalOpen,
);

export const isFriendLoadingSelector = createSelector(
  friendSelector,
  friend => friend.isFriendLoading,
);
