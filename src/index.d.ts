interface GlobalState {
  status: Status.State;
  registration: registration.State;
  login: login.State;
  chat: chat.State;
  permission: permission.State;
}

interface Action<T> {
  type: T;
}

interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}
