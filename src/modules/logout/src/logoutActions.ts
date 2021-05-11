export class logoutActions {
  public static readonly SUBMIT_LOGOUT = 'LOGOUT/SUBMIT_LOGOUT';
  public static readonly TOGGLE_LOGOUT_LOADING = 'LOGOUT/TOGGLE_LOGOUT_LOADING';
}

export declare namespace logoutActionTypes {
  type submitLogoutActionType = Action<typeof logoutActions.SUBMIT_LOGOUT>;
  type toggleLogoutLoadingActionType = ActionWithPayload<
    typeof logoutActions.TOGGLE_LOGOUT_LOADING,
    boolean
  >;
}

export class logoutActionCreators {
  public static submitLogout = (): logoutActionTypes.submitLogoutActionType => ({
    type: logoutActions.SUBMIT_LOGOUT,
  });
  public static toggleLogoutLoading = (
    payload: boolean,
  ): logoutActionTypes.toggleLogoutLoadingActionType => ({
    type: logoutActions.TOGGLE_LOGOUT_LOADING,
    payload,
  });
}
