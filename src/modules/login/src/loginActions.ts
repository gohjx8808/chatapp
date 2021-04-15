export class loginActions {
  public static readonly SUBMIT_LOGIN = 'LOGIN/SUBMIT_LOGIN';
  public static readonly TOGGLE_LOGIN_LOADING = 'LOGIN/TOGGLE_LOGIN_LOADING';
}

export declare namespace loginActionTypes {
  type submitLoginActionType = ActionWithPayload<
    typeof loginActions.SUBMIT_LOGIN,
    login.onLoginPayload
  >;
  type toggleLoginLoadingActionType = ActionWithPayload<
    typeof loginActions.TOGGLE_LOGIN_LOADING,
    boolean
  >;
}

export class loginActionCreators {
  public static submitLogin = (
    payload: login.onLoginPayload,
  ): loginActionTypes.submitLoginActionType => ({
    type: loginActions.SUBMIT_LOGIN,
    payload,
  });
  public static toggleLoginLoading = (
    payload: boolean,
  ): loginActionTypes.toggleLoginLoadingActionType => ({
    type: loginActions.TOGGLE_LOGIN_LOADING,
    payload,
  });
}
