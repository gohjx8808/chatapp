declare namespace login {
  interface State {
    isLoginLoading: boolean;
    userDetails: userData;
  }
  interface onLoginPayload {
    email: string;
    password: string;
  }

  interface userData {
    uid?: string;
    display_name?: string | null;
    photoURL?: string | null;
  }
}
