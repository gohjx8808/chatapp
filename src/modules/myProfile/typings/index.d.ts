declare namespace myProfile {
  interface State {
    isImagePickerDialogOpen: boolean;
  }

  interface imagePickerResponse {
    uri: string;
    base64: string;
    fileName: string;
    type: string;
  }
}
