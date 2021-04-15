declare namespace login {
  interface State {
    isLoginLoading: boolean;
  }
  interface onLoginPayload {
    email: string;
    password: string;
  }
}
