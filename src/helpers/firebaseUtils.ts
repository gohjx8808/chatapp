import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Image} from 'react-native-image-crop-picker';

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

export const googleAuthenticate = () => {
  return GoogleSignin.signIn();
};

export const loginWithGoogle = (
  googleCredential: FirebaseAuthTypes.AuthCredential,
) => {
  return auth().signInWithCredential(googleCredential);
};

export const postUploadProfilePhoto = (data: Image) => {
  return storage().ref(data.filename).putFile(data.path!);
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

export const postSubmitAddFriend = (uid: string, frenID: string) => {
  return database()
    .ref(`/users/${uid}/friends`)
    .update({[frenID]: true});
};

export const defaultAvatar = {
  chatBot: 'chat-bot.jpg',
};

export const getChatFrenList = (databaseRef: string) => {
  return database().ref(databaseRef).once('value');
};

export const getFrenDetail = (frenID: string) => {
  const userDatabaseRef = `/users/${frenID}`;
  return database().ref(userDatabaseRef).once('value');
};

export const deleteFriend = (userID: string, frenID: string) => {
  const userFrenDatabaseRef = `/users/${userID}/friends/${frenID}`;
  database().ref(userFrenDatabaseRef).remove();
  const frenChatDatabaseRef = `/chat/${userID}/${frenID}`;
  database().ref(frenChatDatabaseRef).remove();
};

export const validateCurrentPassword = (email: string, password: string) => {
  const credential = auth.EmailAuthProvider.credential(email, password);
  return auth().currentUser?.reauthenticateWithCredential(credential);
};

export const changePassword = (newPassword: string) => {
  auth().currentUser?.updatePassword(newPassword);
};

export const logout = () => {
  return auth().signOut();
};

export const sendPasswordResetEmail = (
  payload: forgotPassword.submitForgotPasswordPayload,
) => {
  return auth().sendPasswordResetEmail(payload.email);
};

export const deleteAcc = (currentUID: string) => {
  const userDatabaseRef = `/chat/${currentUID}`;
  database().ref(userDatabaseRef).remove();
  auth().currentUser?.delete();
};

export const getChatMessages = (databaseRef: string, msgSize: number) => {
  return database().ref(databaseRef).limitToLast(msgSize).once('value');
};

export const defaultChatMsgLength = 20;
