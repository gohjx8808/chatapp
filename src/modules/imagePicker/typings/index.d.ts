declare namespace imagePicker {
  interface State {
    isImagePickerDialogOpen: boolean;
    imagePickerDialogTitle: string;
    isCropping: boolean;
    uploadedPhoto: uploadedPhotoData;
  }

  interface uploadedPhotoData {
    filename?: string;
    path: string;
    size: number;
    width: number;
    height: number;
    mime: string;
  }
}
