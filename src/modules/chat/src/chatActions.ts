export class chatActions {
  public static readonly STORE_MESSAGES = 'CHAT/STORE_MESSAGES';
}

export declare namespace chatActionTypes {
  type storeMessagesActionType = ActionWithPayload<
    typeof chatActions.STORE_MESSAGES,
    chat.IMessage
  >;
}

export class chatActionCreators {
  public static storeMessages = (
    payload: chat.IMessage,
  ): chatActionTypes.storeMessagesActionType => ({
    type: chatActions.STORE_MESSAGES,
    payload,
  });
}
