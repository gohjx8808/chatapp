declare namespace chat {
  interface State {
    messages: IMessage[];
    selectedFren: frenDetails;
    chatFrenList: frenDetails[];
    isDeleteFriendConfirmModalOpen: boolean;
    isChatLoading: boolean;
    isFriendProfilePhotoModalOpen: boolean;
    imageMsg: submitImageMsgPayload;
  }

  interface IMessage {
    _id: string | number;
    text: string;
    createdAt: Date | number;
    user: User;
  }

  interface User {
    _id: string | number;
    name: string;
    avatar?: string;
  }

  interface dialogFlowResponse {
    queryResult: {fulfillmentMessages: fulfillmentMessageText[]};
  }

  interface fulfillmentMessageText {
    text: {text: string[]};
  }

  interface chatSnapshotData {
    key: string;
  }

  interface submitImageMsgPayload {
    _id: string;
    image: string;
    createdAt: Date;
    user: processedCurrentUserData;
  }

  interface processedCurrentUserData {
    name: string;
    avatar: string;
    _id: string;
  }
}
