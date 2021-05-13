declare namespace myProfile {
  interface State {
    isProfileLoading: boolean;
  }

  interface updateProfilePayload {
    name: string;
    dob: string;
    gender: string;
  }

  interface changePasswordPayload {
    currentPass: string;
    newPass: string;
    confirmNewPass: string;
  }
}
