export class myProfileActions {
  public static readonly TOGGLE_IMAGE_PICKER_DIALOG =
    'MY_PROFILE/TOGGLE_IMAGE_PICKER_DIALOG';
  public static readonly OPEN_CAMERA = 'MY_PROFILE/OPEN_CAMERA';
  public static readonly OPEN_PHOTO_LIBRARY = 'MY_PROFILE/OPEN_PHOTO_LIBRARY';
  public static readonly TOGGLE_PROFILE_LOADING =
    'MY_PROFILE/TOGGLE_PROFILE_LOADING';
  public static readonly SUBMIT_UPDATE_PROFILE =
    'MY_PROFILE/SUBMIT_UPDATE_PROFILE';
  public static readonly SUBMIT_CHANGE_PASSWORD =
    'MY_PROFILE/SUBMIT_CHANGE_PASSWORD';
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
  type toggleProfileLoadingActionType = ActionWithPayload<
    typeof myProfileActions.TOGGLE_PROFILE_LOADING,
    boolean
  >;
  type submitUpdateProfileActionType = ActionWithPayload<
    typeof myProfileActions.SUBMIT_UPDATE_PROFILE,
    myProfile.updateProfilePayload
  >;
  type submitChangePasswordActionType = ActionWithPayload<
    typeof myProfileActions.SUBMIT_CHANGE_PASSWORD,
    myProfile.changePasswordPayload
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
  public static toggleProfileLoading = (
    payload: boolean,
  ): myProfileActionTypes.toggleProfileLoadingActionType => ({
    type: myProfileActions.TOGGLE_PROFILE_LOADING,
    payload,
  });
  public static submitUpdateProfile = (
    payload: myProfile.updateProfilePayload,
  ): myProfileActionTypes.submitUpdateProfileActionType => ({
    type: myProfileActions.SUBMIT_UPDATE_PROFILE,
    payload,
  });
  public static submitChangePassword = (
    payload: myProfile.changePasswordPayload,
  ): myProfileActionTypes.submitChangePasswordActionType => ({
    type: myProfileActions.SUBMIT_CHANGE_PASSWORD,
    payload,
  });
}
