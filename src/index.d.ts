interface GlobalState {
  status: Status.State;
  registration: registration.State;
  login: login.State;
  chat: chat.State;
  permission: permission.State;
  myProfile: myProfile.State;
  friend: friend.State;
  logout: logout.State;
  imagePicker: imagePicker.State;
  loadingOverlay: loadingOverlay.State;
}

interface Action<T> {
  type: T;
}

interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}

interface frenDetails {
  uid: string;
  dob: string;
  email: string;
  gender: string;
  name: string;
  photoName: string;
  photoURL: string;
}
