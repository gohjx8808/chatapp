export class permissionActions {
  public static readonly REQUEST_CAMERA_PERMISSION =
    'PERMISSION/REQUEST_CAMERA_PERMISSION';
  public static readonly REQUEST_PHOTO_LIBRARY_PERMISSION =
    'PERMISSION/REQUEST_PHOTO_LIBRARY_PERMISSION';
  public static readonly UPDATE_PERMISSION_TYPE =
    'PERMISSION/UPDATE_PERMISSION_TYPE';
  public static readonly UPDATE_PERMISSION_STATUS =
    'PERMISSION/UPDATE_PERMISSION_STATUS';
  public static readonly TOGGLE_PERMISSION_MODAL =
    'PERMISSION/TOGGLE_PERMISSION_MODAL';
}

export declare namespace permissionActionTypes {
  type requestCameraPermissionActionType = Action<
    typeof permissionActions.REQUEST_CAMERA_PERMISSION
  >;
  type requestPhotoLibraryPermissionActionType = Action<
    typeof permissionActions.REQUEST_PHOTO_LIBRARY_PERMISSION
  >;
  type updatePermissionTypeActionType = ActionWithPayload<
    typeof permissionActions.UPDATE_PERMISSION_TYPE,
    string
  >;
  type updatePermissionStatusActionType = ActionWithPayload<
    typeof permissionActions.UPDATE_PERMISSION_STATUS,
    permission.PermissionStatus
  >;
  type togglePermissionModalActionType = ActionWithPayload<
    typeof permissionActions.TOGGLE_PERMISSION_MODAL,
    boolean
  >;
}

export class permissionActionCreators {
  public static requestCameraPermission = (): permissionActionTypes.requestCameraPermissionActionType => ({
    type: permissionActions.REQUEST_CAMERA_PERMISSION,
  });
  public static requestPhotoLibraryPermission = (): permissionActionTypes.requestPhotoLibraryPermissionActionType => ({
    type: permissionActions.REQUEST_PHOTO_LIBRARY_PERMISSION,
  });
  public static updatePermissionType = (
    payload: string,
  ): permissionActionTypes.updatePermissionTypeActionType => ({
    type: permissionActions.UPDATE_PERMISSION_TYPE,
    payload,
  });
  public static updatePermissionStatus = (
    payload: permission.PermissionStatus,
  ): permissionActionTypes.updatePermissionStatusActionType => ({
    type: permissionActions.UPDATE_PERMISSION_STATUS,
    payload,
  });
  public static togglePermissionModal = (
    payload: boolean,
  ): permissionActionTypes.togglePermissionModalActionType => ({
    type: permissionActions.TOGGLE_PERMISSION_MODAL,
    payload,
  });
}
