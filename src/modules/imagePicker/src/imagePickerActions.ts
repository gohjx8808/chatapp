import {Image} from 'react-native-image-crop-picker';

export class imagePickerActions {
  public static readonly TOGGLE_IMAGE_PICKER_DIALOG =
    'IMAGE_PICKER/TOGGLE_IMAGE_PICKER_DIALOG';
  public static readonly OPEN_CAMERA = 'IMAGE_PICKER/OPEN_CAMERA';
  public static readonly OPEN_PHOTO_LIBRARY = 'IMAGE_PICKER/OPEN_PHOTO_LIBRARY';
  public static readonly UPDATE_UPLOADED_PHOTO =
    'IMAGE_PICKER/UPDATE_UPLOADED_PHOTO';
  public static readonly CANCEL_IMAGE_PICKER =
    'IMAGE_PICKER/CANCEL_IMAGE_PICKER';
  public static readonly UPDATE_IMAGE_PICKER_DIALOG_TITLE =
    'IMAGE_PICKER/UPDATE_IMAGE_PICKER_DIALOG_TITLE';
  public static readonly TOGGLE_IS_CROPPING = 'IMAGE_PICKER/TOGGLE_IS_CROPPING';
  public static readonly UPDATE_ORIGIN_SCREEN =
    'IMAGE_PICKER/UPDATE_ORIGIN_SCREEN';
}

export declare namespace imagePickerActionTypes {
  type toggleImagePickerDialogActionType = ActionWithPayload<
    typeof imagePickerActions.TOGGLE_IMAGE_PICKER_DIALOG,
    boolean
  >;
  type openCameraActionType = Action<typeof imagePickerActions.OPEN_CAMERA>;
  type openPhotolibraryActionType = Action<
    typeof imagePickerActions.OPEN_PHOTO_LIBRARY
  >;
  type updateUploadedPhotoActionType = ActionWithPayload<
    typeof imagePickerActions.UPDATE_UPLOADED_PHOTO,
    Image
  >;
  type cancelImagePickerActionType = Action<
    typeof imagePickerActions.CANCEL_IMAGE_PICKER
  >;
  type updateImagePickerDialogTitleActionType = ActionWithPayload<
    typeof imagePickerActions.UPDATE_IMAGE_PICKER_DIALOG_TITLE,
    string
  >;
  type toggleIsCroppingActionType = ActionWithPayload<
    typeof imagePickerActions.TOGGLE_IS_CROPPING,
    boolean
  >;
  type updateOriginScreenActionType = ActionWithPayload<
    typeof imagePickerActions.UPDATE_ORIGIN_SCREEN,
    string
  >;
}

export class imagePickerActionCreators {
  public static toggleImagePickerDialog = (
    payload: boolean,
  ): imagePickerActionTypes.toggleImagePickerDialogActionType => ({
    type: imagePickerActions.TOGGLE_IMAGE_PICKER_DIALOG,
    payload,
  });
  public static openCamera = (): imagePickerActionTypes.openCameraActionType => ({
    type: imagePickerActions.OPEN_CAMERA,
  });
  public static openPhotolibrary = (): imagePickerActionTypes.openPhotolibraryActionType => ({
    type: imagePickerActions.OPEN_PHOTO_LIBRARY,
  });
  public static updateUploadedPhoto = (
    payload: Image,
  ): imagePickerActionTypes.updateUploadedPhotoActionType => ({
    type: imagePickerActions.UPDATE_UPLOADED_PHOTO,
    payload,
  });
  public static cancelImagePicker = (): imagePickerActionTypes.cancelImagePickerActionType => ({
    type: imagePickerActions.CANCEL_IMAGE_PICKER,
  });
  public static updateImagePickerDialogTitle = (
    payload: string,
  ): imagePickerActionTypes.updateImagePickerDialogTitleActionType => ({
    type: imagePickerActions.UPDATE_IMAGE_PICKER_DIALOG_TITLE,
    payload,
  });
  public static toggleIsCropping = (
    payload: boolean,
  ): imagePickerActionTypes.toggleIsCroppingActionType => ({
    type: imagePickerActions.TOGGLE_IS_CROPPING,
    payload,
  });
  public static updateOriginScreen = (
    payload: string,
  ): imagePickerActionTypes.updateOriginScreenActionType => ({
    type: imagePickerActions.UPDATE_ORIGIN_SCREEN,
    payload,
  });
}
