interface GlobalState {
  status: Status.State;
  registration: registration.State;
}

interface Action<T> {
  type: T;
}

interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}
