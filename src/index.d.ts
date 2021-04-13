interface GlobalState {}

interface Action<T> {
  type: T;
}

interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}
