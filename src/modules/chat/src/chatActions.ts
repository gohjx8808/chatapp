export class chatActions {
  public static readonly STORE_MESSAGES = 'CHAT/STORE_MESSAGES';
  public static readonly GET_FREN_LIST = 'CHAT/GET_FREN_LIST';
  public static readonly LOAD_FREN_LIST = 'CHAT/LOAD_FREN_LIST';
  public static readonly LOAD_SELECTED_FREN = 'CHAT/LOAD_SELECTED_FREN';
}

export declare namespace chatActionTypes {
  type storeMessagesActionType = ActionWithPayload<
    typeof chatActions.STORE_MESSAGES,
    chat.IMessage
  >;
  type getFrenListActionType = Action<typeof chatActions.GET_FREN_LIST>;
  type loadFrenListActionType = ActionWithPayload<
    typeof chatActions.LOAD_FREN_LIST,
    chat.frenData
  >;
  type loadSelectedFrenActionType = ActionWithPayload<
    typeof chatActions.LOAD_SELECTED_FREN,
    string
  >;
}

export class chatActionCreators {
  public static storeMessages = (
    payload: chat.IMessage,
  ): chatActionTypes.storeMessagesActionType => ({
    type: chatActions.STORE_MESSAGES,
    payload,
  });
  public static getFrenList = (): chatActionTypes.getFrenListActionType => ({
    type: chatActions.GET_FREN_LIST,
  });
  public static loadFrenList = (
    payload: chat.frenData,
  ): chatActionTypes.loadFrenListActionType => ({
    type: chatActions.LOAD_FREN_LIST,
    payload,
  });
  public static loadSelectedFren = (
    payload: string,
  ): chatActionTypes.loadSelectedFrenActionType => ({
    type: chatActions.LOAD_SELECTED_FREN,
    payload,
  });
}
