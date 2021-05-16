export class chatActions {
  public static readonly STORE_MESSAGES = 'CHAT/STORE_MESSAGES';
  public static readonly LOAD_SELECTED_FREN = 'CHAT/LOAD_SELECTED_FREN';
  public static readonly GET_CHAT_MESSAGES = 'CHAT/GET_CHAT_MESSAGES';
  public static readonly GET_CHAT_FREN_LIST = 'CHAT/GET_CHAT_FREN_LIST';
  public static readonly LOAD_CHAT_FREN_LIST = 'CHAT/LOAD_CHAT_FREN_LIST';
  public static readonly TOGGLE_DELETE_FIEND_CONFIRM_MODAL =
    'CHAT/TOGGLE_DELETE_FIEND_CONFIRM_MODAL';
  public static readonly DELETE_FRIEND = 'CHAT/DELETE_FRIEND';
  public static readonly TOGGLE_CHAT_LOADING = 'CHAT/TOGGLE_CHAT_LOADING';
  public static readonly TOGGLE_FRIEND_PROFILE_PHOTO =
    'CHAT/TOGGLE_FRIEND_PROFILE_PHOTO';
  public static readonly SELECT_CHAT_IMAGE = 'CHAT/SELECT_CHAT_IMAGE';
  public static readonly ON_PENDING_IMAGE_UNMOUNT =
    'CHAT/ON_PENDING_IMAGE_UNMOUNT';
  public static readonly SEND_IMAGE_MSG = 'CHAT/SEND_IMAGE_MSG';
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
  type toggleDeleteFriendConfirmModalActionType = ActionWithPayload<
    typeof chatActions.TOGGLE_DELETE_FIEND_CONFIRM_MODAL,
    boolean
  >;
  type deleteFriendActionType = ActionWithPayload<
    typeof chatActions.DELETE_FRIEND,
    string
  >;
  type toggleChatLoadingActionType = ActionWithPayload<
    typeof chatActions.TOGGLE_CHAT_LOADING,
    boolean
  >;
  type toggleFriendProfilePhotoActionType = ActionWithPayload<
    typeof chatActions.TOGGLE_FRIEND_PROFILE_PHOTO,
    boolean
  >;
  type selectChatImageActionType = Action<typeof chatActions.SELECT_CHAT_IMAGE>;
  type onPendingImageUnmountActionType = Action<
    typeof chatActions.ON_PENDING_IMAGE_UNMOUNT
  >;
  type sendImageMsgActionType = ActionWithPayload<
    typeof chatActions.SEND_IMAGE_MSG,
    string
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
  public static toggleDeleteFriendConfirmModal = (
    payload: boolean,
  ): chatActionTypes.toggleDeleteFriendConfirmModalActionType => ({
    type: chatActions.TOGGLE_DELETE_FIEND_CONFIRM_MODAL,
    payload,
  });
  public static deleteFriend = (
    payload: string,
  ): chatActionTypes.deleteFriendActionType => ({
    type: chatActions.DELETE_FRIEND,
    payload,
  });
  public static toggleChatLoading = (
    payload: boolean,
  ): chatActionTypes.toggleChatLoadingActionType => ({
    type: chatActions.TOGGLE_CHAT_LOADING,
    payload,
  });
  public static toggleFriendProfilePhoto = (
    payload: boolean,
  ): chatActionTypes.toggleFriendProfilePhotoActionType => ({
    type: chatActions.TOGGLE_FRIEND_PROFILE_PHOTO,
    payload,
  });
  public static selectChatImage = (): chatActionTypes.selectChatImageActionType => ({
    type: chatActions.SELECT_CHAT_IMAGE,
  });
  public static onPendingImageUnmount = (): chatActionTypes.onPendingImageUnmountActionType => ({
    type: chatActions.ON_PENDING_IMAGE_UNMOUNT,
  });
  public static sendImageMsg = (
    payload: string,
  ): chatActionTypes.sendImageMsgActionType => ({
    type: chatActions.SEND_IMAGE_MSG,
    payload,
  });
}
