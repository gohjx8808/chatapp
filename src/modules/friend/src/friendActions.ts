export class friendActions {
  public static readonly TOGGLE_ADD_FRIEND_MODAL =
    'FRIEND/TOGGLE_ADD_FRIEND_MODAL';
  public static readonly SUBMIT_ADD_FRIEND = 'FRIEND/SUBMIT_ADD_FRIEND';
  public static readonly TOGGLE_FRIEND_LOADING = 'FRIEND/TOGGLE_FRIEND_LOADING';
}

export declare namespace friendActionTypes {
  type toggleAddFriendModalActionType = ActionWithPayload<
    typeof friendActions.TOGGLE_ADD_FRIEND_MODAL,
    boolean
  >;
  type submitAddFriendActionType = ActionWithPayload<
    typeof friendActions.SUBMIT_ADD_FRIEND,
    string
  >;
  type toggleFriendLoadingActionType = ActionWithPayload<
    typeof friendActions.TOGGLE_FRIEND_LOADING,
    boolean
  >;
}

export class friendActionCreators {
  public static toggleAddFriendModal = (
    payload: boolean,
  ): friendActionTypes.toggleAddFriendModalActionType => ({
    type: friendActions.TOGGLE_ADD_FRIEND_MODAL,
    payload,
  });
  public static submitAddFriend = (
    payload: string,
  ): friendActionTypes.submitAddFriendActionType => ({
    type: friendActions.SUBMIT_ADD_FRIEND,
    payload,
  });
  public static toggleFriendLoading = (
    payload: boolean,
  ): friendActionTypes.toggleFriendLoadingActionType => ({
    type: friendActions.TOGGLE_FRIEND_LOADING,
    payload,
  });
}
