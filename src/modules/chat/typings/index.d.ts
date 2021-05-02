declare namespace chat {
  interface State {
    messages: IMessage[];
    chatFrenList: chatFrenData[];
    selectedFren: frenData;
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

  interface chatFrenData {
    uid: string;
    name: string;
    photoURL: string;
  }

  interface chatSnapshotData {
    key: string;
  }
}
