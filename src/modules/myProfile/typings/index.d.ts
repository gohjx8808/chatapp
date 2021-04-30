declare namespace myProfile {
  interface State {
    isImagePickerDialogOpen: boolean;
    isProfileLoading: boolean;
  }

  interface imagePickerResponse {
    uri: string;
    base64: string;
    fileName: string;
    type: string;
  }

  interface updateProfilePayload {
    name: string;
    dob: string;
    gender: string;
  }
}
