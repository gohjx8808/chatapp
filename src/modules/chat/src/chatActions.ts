export class chatActions {
  public static readonly STORE_MESSAGES = 'CHAT/STORE_MESSAGES';
  public static readonly LOAD_SELECTED_FREN = 'CHAT/LOAD_SELECTED_FREN';
  public static readonly GET_CHAT_MESSAGES = 'CHAT/GET_CHAT_MESSAGES';
  public static readonly GET_CHAT_FREN_LIST = 'CHAT/GET_CHAT_FREN_LIST';
  public static readonly LOAD_CHAT_FREN_LIST = 'CHAT/LOAD_CHAT_FREN_LIST';
  public static readonly CLEAR_CHAT_FREN_LIST = 'CHAT/CLEAR_CHAT_FREN_LIST';
}

export declare namespace chatActionTypes {
  type storeMessagesActionType = ActionWithPayload<
    typeof chatActions.STORE_MESSAGES,
    chat.IMessage[]
  >;
  type loadSelectedFrenActionType = ActionWithPayload<
    typeof chatActions.LOAD_SELECTED_FREN,
    frenDetails
  >;
  type getChatMessagesActionType = Action<typeof chatActions.GET_CHAT_MESSAGES>;
  type getChatFrenListActionType = Action<
    typeof chatActions.GET_CHAT_FREN_LIST
  >;
  type loadChatFrenListActionType = ActionWithPayload<
    typeof chatActions.LOAD_CHAT_FREN_LIST,
    frenDetails[]
  >;
  type clearChatFrenListActionType = Action<
    typeof chatActions.CLEAR_CHAT_FREN_LIST
  >;
}

export class chatActionCreators {
  public static storeMessages = (
    payload: chat.IMessage[],
  ): chatActionTypes.storeMessagesActionType => ({
    type: chatActions.STORE_MESSAGES,
    payload,
  });
  public static loadSelectedFren = (
    payload: frenDetails,
  ): chatActionTypes.loadSelectedFrenActionType => ({
    type: chatActions.LOAD_SELECTED_FREN,
    payload,
  });
  public static getChatMessages = (): chatActionTypes.getChatMessagesActionType => ({
    type: chatActions.GET_CHAT_MESSAGES,
  });
  public static getChatFrenList = (): chatActionTypes.getChatFrenListActionType => ({
    type: chatActions.GET_CHAT_FREN_LIST,
  });
  public static loadChatFrenList = (
    payload: frenDetails[],
  ): chatActionTypes.loadChatFrenListActionType => ({
    type: chatActions.LOAD_CHAT_FREN_LIST,
    payload,
  });
  public static clearChatFrenList = (): chatActionTypes.clearChatFrenListActionType => ({
    type: chatActions.CLEAR_CHAT_FREN_LIST,
  });
}
