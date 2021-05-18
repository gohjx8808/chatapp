export class forgotPasswordActions {
  public static readonly SUBMIT_FORGOT_PASSWORD =
    'FORGOT_PASSWORD/SUBMIT_FORGOT_PASSWORD';
}

export declare namespace forgotPasswordActionTypes {
  type submitForgotPasswordActionType = ActionWithPayload<
    typeof forgotPasswordActions.SUBMIT_FORGOT_PASSWORD,
    forgotPassword.submitForgotPasswordPayload
  >;
}

export class forgotPasswordActionCreators {
  public static submiForgotPassword = (
    payload: forgotPassword.submitForgotPasswordPayload,
  ): forgotPasswordActionTypes.submitForgotPasswordActionType => ({
    type: forgotPasswordActions.SUBMIT_FORGOT_PASSWORD,
    payload,
  });
}
