export class myProfileActions {
  public static readonly TOGGLE_IMAGE_PICKER_DIALOG =
    'MY_PROFILE/TOGGLE_IMAGE_PICKER_DIALOG';
  public static readonly OPEN_CAMERA = 'MY_PROFILE/OPEN_CAMERA';
  public static readonly OPEN_PHOTO_LIBRARY = 'MY_PROFILE/OPEN_PHOTO_LIBRARY';
}

export declare namespace myProfileActionTypes {
  type toggleImagePickerDialogActionType = ActionWithPayload<
    typeof myProfileActions.TOGGLE_IMAGE_PICKER_DIALOG,
    boolean
  >;
  type openCameraActionType = Action<typeof myProfileActions.OPEN_CAMERA>;
  type openPhotolibraryActionType = Action<
    typeof myProfileActions.OPEN_PHOTO_LIBRARY
  >;
}

export class myProfileActionCreators {
  public static toggleImagePickerDialog = (
    payload: boolean,
  ): myProfileActionTypes.toggleImagePickerDialogActionType => ({
    type: myProfileActions.TOGGLE_IMAGE_PICKER_DIALOG,
    payload,
  });
  public static openCamera = (): myProfileActionTypes.openCameraActionType => ({
    type: myProfileActions.OPEN_CAMERA,
  });
  public static openPhotolibrary = (): myProfileActionTypes.openPhotolibraryActionType => ({
    type: myProfileActions.OPEN_PHOTO_LIBRARY,
  });
}
