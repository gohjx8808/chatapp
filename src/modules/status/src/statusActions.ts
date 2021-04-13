export class statusActions {
  public static readonly TOGGLE_STATUS_MODAL =
    'REGISTRATION/TOGGLE_STATUS_MODAL';
  public static readonly UPDATE_STATUS_TITLE =
    'REGISTRATION/UPDATE_STATUS_TITLE';
  public static readonly UPDATE_STATUS_MSG = 'REGISTRATION/UPDATE_STATUS_MSG';
  public static readonly TOGGLE_API_STATUS = 'REGISTRATION/TOGGLE_API_STATUS';
}

export declare namespace statusActionTypes {
  type toggleStatusModalActionType = ActionWithPayload<
    typeof statusActions.TOGGLE_STATUS_MODAL,
    boolean
  >;
  type updateStatusTitleActionType = ActionWithPayload<
    typeof statusActions.UPDATE_STATUS_TITLE,
    string
  >;
  type updateStatusMsgActionType = ActionWithPayload<
    typeof statusActions.UPDATE_STATUS_MSG,
    string
  >;
  type toggleApiStatusActionType = ActionWithPayload<
    typeof statusActions.TOGGLE_API_STATUS,
    boolean
  >;
}

export class statusActionCreators {
  public static toggleStatusModal = (
    payload: boolean,
  ): statusActionTypes.toggleStatusModalActionType => ({
    type: statusActions.TOGGLE_STATUS_MODAL,
    payload,
  });
  public static updateStatusTitle = (
    payload: string,
  ): statusActionTypes.updateStatusTitleActionType => ({
    type: statusActions.UPDATE_STATUS_TITLE,
    payload,
  });
  public static updateStatusMsg = (
    payload: string,
  ): statusActionTypes.updateStatusMsgActionType => ({
    type: statusActions.UPDATE_STATUS_MSG,
    payload,
  });
  public static toggleApiStatus = (
    payload: boolean,
  ): statusActionTypes.toggleApiStatusActionType => ({
    type: statusActions.TOGGLE_API_STATUS,
    payload,
  });
}
