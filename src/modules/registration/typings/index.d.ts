declare namespace registration {
  interface State {
    isRegisterLoading: boolean;
  }
  interface authPayload {
    email: string;
    password: string;
  }

  interface requirementData {
    requirement: string;
    achieved: boolean;
    key: string;
  }
}
