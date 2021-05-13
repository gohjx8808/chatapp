export class myProfileActions {
  public static readonly TOGGLE_PROFILE_LOADING =
    'MY_PROFILE/TOGGLE_PROFILE_LOADING';
  public static readonly SUBMIT_UPDATE_PROFILE =
    'MY_PROFILE/SUBMIT_UPDATE_PROFILE';
  public static readonly SUBMIT_CHANGE_PASSWORD =
    'MY_PROFILE/SUBMIT_CHANGE_PASSWORD';
  public static readonly UPDATE_PROFILE_PHOTO =
    'MY_PROFILE/UPDATE_PROFILE_PHOTO';
}

export declare namespace myProfileActionTypes {
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
  type updateProfilePhotoActionType = Action<
    typeof myProfileActions.UPDATE_PROFILE_PHOTO
  >;
}

export class myProfileActionCreators {
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
  public static updateProfilePhoto = (): myProfileActionTypes.updateProfilePhotoActionType => ({
    type: myProfileActions.UPDATE_PROFILE_PHOTO,
  });
}
