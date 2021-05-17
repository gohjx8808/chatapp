export class logoutActions {
  public static readonly SUBMIT_LOGOUT = 'LOGOUT/SUBMIT_LOGOUT';
}

export declare namespace logoutActionTypes {
  type submitLogoutActionType = Action<typeof logoutActions.SUBMIT_LOGOUT>;
}

export class logoutActionCreators {
  public static submitLogout = (): logoutActionTypes.submitLogoutActionType => ({
    type: logoutActions.SUBMIT_LOGOUT,
  });
}
