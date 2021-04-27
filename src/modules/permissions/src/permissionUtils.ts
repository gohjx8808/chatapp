import {Platform} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

export const checkCameraPermission = () => {
  return check(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  );
};

export const requestCameraPermission = () => {
  return request(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  );
};

export const checkPhotoLibraryPermission = () => {
  return check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  );
};

export const requestPhotoLibraryPermission = () => {
  return request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  );
};
