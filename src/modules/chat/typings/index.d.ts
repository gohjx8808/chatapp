declare namespace chat {
  interface State {
    messages: IMessage[];
    frenList: frenData[];
    selectedFren: string;
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

  interface frenData {
    uid: string;
    name: string;
  }

  interface userSnapshotData {
    email: string;
    name: string;
  }

  interface chatSnapshotData {
    key: string;
  }
}
