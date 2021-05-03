interface GlobalState {
  status: Status.State;
  registration: registration.State;
  login: login.State;
  chat: chat.State;
  permission: permission.State;
  myProfile: myProfile.State;
  friend: friend.State;
}

interface Action<T> {
  type: T;
}

interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}

interface frenData {
  uid: string;
  name: string;
  photoURL: string;
}
