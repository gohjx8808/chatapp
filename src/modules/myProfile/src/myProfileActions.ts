export class myProfileActions {
  public static readonly TOGGLE_IMAGE_PICKER_DIALOG =
    'MY_PROFILE/TOGGLE_IMAGE_PICKER_DIALOG';
}

export declare namespace myProfileActionTypes {
  type toggleImagePickerDialog = ActionWithPayload<
    typeof myProfileActions.TOGGLE_IMAGE_PICKER_DIALOG,
    boolean
  >;
}

export class myProfileActionCreators {
  public static toggleImagePickerDialog = (
    payload: boolean,
  ): myProfileActionTypes.toggleImagePickerDialog => ({
    type: myProfileActions.TOGGLE_IMAGE_PICKER_DIALOG,
    payload,
  });
}
