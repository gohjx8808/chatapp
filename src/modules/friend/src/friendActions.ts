export class friendActions {
  public static readonly TOGGLE_ADD_FREN_MODAL = 'FRIEND/TOGGLE_ADD_FREN_MODAL';
  public static readonly SUBMIT_ADD_FREN = 'FRIEND/SUBMIT_ADD_FREN';
  public static readonly TOGGLE_FRIEND_LOADING = 'FRIEND/TOGGLE_FRIEND_LOADING';
}

export declare namespace friendActionTypes {
  type toggleAddFrenModalActionType = ActionWithPayload<
    typeof friendActions.TOGGLE_ADD_FREN_MODAL,
    boolean
  >;
  type submitAddFrenActionType = ActionWithPayload<
    typeof friendActions.SUBMIT_ADD_FREN,
    string
  >;
  type toggleFriendLoadingActionType = ActionWithPayload<
    typeof friendActions.TOGGLE_FRIEND_LOADING,
    boolean
  >;
}

export class friendActionCreators {
  public static toggleAddFrenModal = (
    payload: boolean,
  ): friendActionTypes.toggleAddFrenModalActionType => ({
    type: friendActions.TOGGLE_ADD_FREN_MODAL,
    payload,
  });
  public static submitAddFren = (
    payload: string,
  ): friendActionTypes.submitAddFrenActionType => ({
    type: friendActions.SUBMIT_ADD_FREN,
    payload,
  });
  public static toggleFriendLoading = (
    payload: boolean,
  ): friendActionTypes.toggleFriendLoadingActionType => ({
    type: friendActions.TOGGLE_FRIEND_LOADING,
    payload,
  });
}
