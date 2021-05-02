import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {ImagePickerResponse} from 'react-native-image-picker';
import database from '@react-native-firebase/database';

export const postSubmitRegister = (
  data: registration.submitRegisterPayload,
) => {
  return auth().createUserWithEmailAndPassword(data.email, data.password);
};

export const postUpdateProfile = (displayName: string) => {
  return auth().currentUser?.updateProfile({displayName: displayName});
};

export const postSubmitLogin = (data: login.onLoginPayload) => {
  return auth().signInWithEmailAndPassword(data.email, data.password);
};

export const postUploadProfilePhoto = (data: ImagePickerResponse) => {
  return storage().ref(data.fileName).putFile(data.uri!);
};

export const getUploadedPhotoUrl = (imageName: string) => {
  return storage().ref(`/${imageName}`).getDownloadURL();
};

export const postUpdateCurrentUserProfile = (data: any, uid: string) => {
  return database().ref(`/users/${uid}`).update(data);
};

export const postDeletePrevUploadedPhoto = (prevPhotoName: string) => {
  storage().ref(`/${prevPhotoName}`).delete();
};

export const postSubmitAddFren = (uid: string, frenID: string) => {
  return database()
    .ref(`/users/${uid}/friends`)
    .update({[frenID]: true});
};

export const defaultAvatar = {
  chatBot: 'chat-bot.jpg',
  defaultUser: 'default-user.png',
};
