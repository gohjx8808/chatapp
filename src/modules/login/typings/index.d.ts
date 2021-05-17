declare namespace login {
  interface State {
    currentUser: currentUserData;
  }
  interface onLoginPayload {
    email: string;
    password: string;
  }

  interface currentUserData {
    uid: string;
    email: string;
    name: string;
    photoURL: string;
    photoName: string;
    dob: string;
    gender: string;
  }

  interface getUserDataPayload {
    uid: string;
    email: string;
    name: string;
    photoName: string;
    dob: string;
    gender: string;
  }
}
