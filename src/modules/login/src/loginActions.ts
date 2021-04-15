export class loginActions {
  public static readonly SUBMIT_LOGIN = 'LOGIN/SUBMIT_LOGIN';
}

export declare namespace loginActionTypes {
  type submitLoginActionType = ActionWithPayload<
    typeof loginActions.SUBMIT_LOGIN,
    registration.authPayload
  >;
}

export class loginActionCreators {
  public static submitLogin = (
    payload: registration.authPayload,
  ): loginActionTypes.submitLoginActionType => ({
    type: loginActions.SUBMIT_LOGIN,
    payload,
  });
}
