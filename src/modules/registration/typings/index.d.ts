declare namespace registration {
  interface State {}
  interface submitRegisterPayload {
    email: string;
    password: string;
    displayName: string;
  }

  interface requirementData {
    requirement: string;
    achieved: boolean;
    key: string;
  }

  interface registerResponse {
    user: {
      uid: string;
    };
  }
}
