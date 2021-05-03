export class chatActions {
  public static readonly STORE_MESSAGES = 'CHAT/STORE_MESSAGES';
  public static readonly LOAD_SELECTED_FREN = 'CHAT/LOAD_SELECTED_FREN';
  public static readonly GET_CHAT_MESSAGES = 'CHAT/GET_CHAT_MESSAGES';
}

export declare namespace chatActionTypes {
  type storeMessagesActionType = ActionWithPayload<
    typeof chatActions.STORE_MESSAGES,
    chat.IMessage[]
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
