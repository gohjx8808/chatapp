export class loginActions {
  public static readonly SUBMIT_LOGIN = 'LOGIN/SUBMIT_LOGIN';
  public static readonly STORE_USER_DETAILS = 'LOGIN/STORE_USER_DETAILS';
  public static readonly DONE_STORING_CURRENT_USER_DATA =
    'LOGIN/DONE_STORING_CURRENT_USER_DATA';
  public static readonly LOGIN_WITH_GOOGLE = 'LOGIN/LOGIN_WITH_GOOGLE';
}

export declare namespace loginActionTypes {
  type submitLoginActionType = ActionWithPayload<
    typeof loginActions.SUBMIT_LOGIN,
    login.onLoginPayload
  >;
  type storeUserDetailsActionType = ActionWithPayload<
    typeof loginActions.STORE_USER_DETAILS,
    login.currentUserData
  >;
  type doneStoringCurrentUserDataActionType = Action<
    typeof loginActions.DONE_STORING_CURRENT_USER_DATA
  >;
  type loginWithGoogleActionType = Action<
    typeof loginActions.LOGIN_WITH_GOOGLE
  >;
}

export class loginActionCreators {
  public static submitLogin = (
    payload: login.onLoginPayload,
  ): loginActionTypes.submitLoginActionType => ({
    type: loginActions.SUBMIT_LOGIN,
    payload,
  });
  public static storeUserDetails = (
    payload: login.currentUserData,
  ): loginActionTypes.storeUserDetailsActionType => ({
    type: loginActions.STORE_USER_DETAILS,
    payload,
  });
  public static doneStoringCurrentUserData = (): loginActionTypes.doneStoringCurrentUserDataActionType => ({
    type: loginActions.DONE_STORING_CURRENT_USER_DATA,
  });
  public static loginWithGoogle = (): loginActionTypes.loginWithGoogleActionType => ({
    type: loginActions.LOGIN_WITH_GOOGLE,
  });
}
