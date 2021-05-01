export class chatActions {
  public static readonly STORE_MESSAGES = 'CHAT/STORE_MESSAGES';
  public static readonly GET_FREN_LIST = 'CHAT/GET_FREN_LIST';
  public static readonly LOAD_FREN_LIST = 'CHAT/LOAD_FREN_LIST';
  public static readonly LOAD_SELECTED_FREN = 'CHAT/LOAD_SELECTED_FREN';
  public static readonly GET_CHAT_MESSAGES = 'CHAT/GET_CHAT_MESSAGES';
  public static readonly TOGGLE_ADD_FREN_MODAL = 'CHAT/TOGGLE_ADD_FREN_MODAL';
}

export declare namespace chatActionTypes {
  type storeMessagesActionType = ActionWithPayload<
    typeof chatActions.STORE_MESSAGES,
    chat.IMessage[]
  >;
  type getFrenListActionType = Action<typeof chatActions.GET_FREN_LIST>;
  type loadFrenListActionType = ActionWithPayload<
    typeof chatActions.LOAD_FREN_LIST,
    chat.frenData
  >;
  type loadSelectedFrenActionType = ActionWithPayload<
    typeof chatActions.LOAD_SELECTED_FREN,
    chat.frenData
  >;
  type getChatMessagesActionType = Action<typeof chatActions.GET_CHAT_MESSAGES>;
  type toggleAddFrenModalActionType = ActionWithPayload<
    typeof chatActions.TOGGLE_ADD_FREN_MODAL,
    boolean
  >;
}

export class chatActionCreators {
  public static storeMessages = (
    payload: chat.IMessage[],
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
    payload: chat.frenData,
  ): chatActionTypes.loadSelectedFrenActionType => ({
    type: chatActions.LOAD_SELECTED_FREN,
    payload,
  });
  public static getChatMessages = (): chatActionTypes.getChatMessagesActionType => ({
    type: chatActions.GET_CHAT_MESSAGES,
  });
  public static toggleAddFrenModal = (
    payload: boolean,
  ): chatActionTypes.toggleAddFrenModalActionType => ({
    type: chatActions.TOGGLE_ADD_FREN_MODAL,
    payload,
  });
}
