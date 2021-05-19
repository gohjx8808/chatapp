export class myProfileActions {
  public static readonly SUBMIT_UPDATE_PROFILE =
    'MY_PROFILE/SUBMIT_UPDATE_PROFILE';
  public static readonly SUBMIT_CHANGE_PASSWORD =
    'MY_PROFILE/SUBMIT_CHANGE_PASSWORD';
  public static readonly UPDATE_PROFILE_PHOTO =
    'MY_PROFILE/UPDATE_PROFILE_PHOTO';
  public static readonly SUBMIT_DELETE_ACC = 'MY_PROFILE/SUBMIT_DELETE_ACC';
  public static readonly TOGGLE_DELETE_ACC_MODAL =
    'MY_PROFILE/TOGGLE_DELETE_ACC_MODAL';
}

export declare namespace myProfileActionTypes {
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
  type submitDeleteAccActionType = Action<
    typeof myProfileActions.SUBMIT_DELETE_ACC
  >;
  type toggleDeleteAccModalActionType = ActionWithPayload<
    typeof myProfileActions.TOGGLE_DELETE_ACC_MODAL,
    boolean
  >;
}

export class myProfileActionCreators {
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
  public static submitDeleteAcc = (): myProfileActionTypes.submitDeleteAccActionType => ({
    type: myProfileActions.SUBMIT_DELETE_ACC,
  });
  public static toggleDeleteAccModal = (
    payload: boolean,
  ): myProfileActionTypes.toggleDeleteAccModalActionType => ({
    type: myProfileActions.TOGGLE_DELETE_ACC_MODAL,
    payload,
  });
}
