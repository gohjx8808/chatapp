export class chatActions {
  public static readonly STORE_MESSAGES = 'CHAT/STORE_MESSAGES';
  public static readonly GET_CHAT_FREN_LIST = 'CHAT/GET_FREN_LIST';
  public static readonly LOAD_CHAT_FREN_LIST = 'CHAT/LOAD_FREN_LIST';
  public static readonly LOAD_SELECTED_FREN = 'CHAT/LOAD_SELECTED_FREN';
  public static readonly GET_CHAT_MESSAGES = 'CHAT/GET_CHAT_MESSAGES';
}

export declare namespace chatActionTypes {
  type storeMessagesActionType = ActionWithPayload<
    typeof chatActions.STORE_MESSAGES,
    chat.IMessage[]
  >;
  type getChatFrenListActionType = Action<
    typeof chatActions.GET_CHAT_FREN_LIST
  >;
  type loadChatFrenListActionType = ActionWithPayload<
    typeof chatActions.LOAD_CHAT_FREN_LIST,
    frenData
  >;
  type loadSelectedFrenActionType = ActionWithPayload<
    typeof chatActions.LOAD_SELECTED_FREN,
    frenData
  >;
  type getChatMessagesActionType = Action<typeof chatActions.GET_CHAT_MESSAGES>;
}

export class chatActionCreators {
  public static storeMessages = (
    payload: chat.IMessage[],
  ): chatActionTypes.storeMessagesActionType => ({
    type: chatActions.STORE_MESSAGES,
    payload,
  });
  public static getChatFrenList = (): chatActionTypes.getChatFrenListActionType => ({
    type: chatActions.GET_CHAT_FREN_LIST,
  });
  public static loadChatFrenList = (
    payload: frenData,
  ): chatActionTypes.loadChatFrenListActionType => ({
    type: chatActions.LOAD_CHAT_FREN_LIST,
    payload,
  });
  public static loadSelectedFren = (
    payload: frenData,
  ): chatActionTypes.loadSelectedFrenActionType => ({
    type: chatActions.LOAD_SELECTED_FREN,
    payload,
  });
  public static getChatMessages = (): chatActionTypes.getChatMessagesActionType => ({
    type: chatActions.GET_CHAT_MESSAGES,
  });
}
