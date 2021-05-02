export class friendActions {
  public static readonly TOGGLE_ADD_FREN_MODAL = 'CHAT/TOGGLE_ADD_FREN_MODAL';
}

export declare namespace friendActionTypes {
  type toggleAddFrenModalActionType = ActionWithPayload<
    typeof friendActions.TOGGLE_ADD_FREN_MODAL,
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
}
