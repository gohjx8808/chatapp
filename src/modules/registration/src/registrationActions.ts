export class registrationActions {
  public static readonly SUBMIT_REGISTER = 'REGISTRATION/SUBMIT_REGISTER';
}

export declare namespace registrationActionTypes {
  type submitRegisterActionType = ActionWithPayload<
    typeof registrationActions.SUBMIT_REGISTER,
    registration.submitRegisterPayload
  >;
}

export class registrationActionCreators {
  public static submitRegister = (
    payload: registration.submitRegisterPayload,
  ): registrationActionTypes.submitRegisterActionType => ({
    type: registrationActions.SUBMIT_REGISTER,
    payload,
  });
}
