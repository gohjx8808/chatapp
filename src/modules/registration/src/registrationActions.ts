export class registrationActions {
  public static readonly SUBMIT_REGISTER = 'REGISTRATION/SUBMIT_REGISTER';
  public static readonly TOGGLE_REGISTER_LOADING =
    'REGISTRATION/TOGGLE_REGISTER_LOADING';
}

export declare namespace registrationActionTypes {
  type submitRegisterActionType = ActionWithPayload<
    typeof registrationActions.SUBMIT_REGISTER,
    registration.authPayload
  >;
  type toggleRegisterLoadingActionType = ActionWithPayload<
    typeof registrationActions.TOGGLE_REGISTER_LOADING,
    boolean
  >;
}

export class registrationActionCreators {
  public static submitRegister = (
    payload: registration.authPayload,
  ): registrationActionTypes.submitRegisterActionType => ({
    type: registrationActions.SUBMIT_REGISTER,
    payload,
  });
  public static toggleRegisterLoading = (
    payload: boolean,
  ): registrationActionTypes.toggleRegisterLoadingActionType => ({
    type: registrationActions.TOGGLE_REGISTER_LOADING,
    payload,
  });
}
