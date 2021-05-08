declare namespace myProfile {
  interface State {
    isImagePickerDialogOpen: boolean;
    isProfileLoading: boolean;
  }

  interface updateProfilePayload {
    name: string;
    dob: string;
    gender: string;
  }
}
