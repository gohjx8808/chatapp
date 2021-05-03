import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {ImagePickerResponse} from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import {eventChannel} from '@redux-saga/core';
import assets from './assets';

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

export const postSubmitAddFriend = (uid: string, frenID: string) => {
  return database()
    .ref(`/users/${uid}/friends`)
    .update({[frenID]: true});
};

export const getFrenList = (userID: string, fromScreen: string) => {
  let targetDatabaseRef = '';
  if (fromScreen === 'chat') {
    targetDatabaseRef = `/chat/${userID}`;
  } else {
    targetDatabaseRef = `/users/${userID}/friends`;
  }
  return eventChannel(emitter => {
    database()
      .ref(targetDatabaseRef)
      .on('value', frenSnapshots => {
        frenSnapshots.forEach(frenSnapshot => {
          const frenID = frenSnapshot.key;
          const userDatabaseRef = `/users/${frenID}`;
          database()
            .ref(userDatabaseRef)
            .once('value', (userSnapshot: any) => {
              if (userSnapshot.val().photoName === '') {
                const chatFrenData = {
                  uid: frenID,
                  name: userSnapshot.val().name,
                  photoURL: assets.defaultUser,
                };
                emitter(chatFrenData);
              } else {
                storage()
                  .ref(`/${userSnapshot.val().photoName}`)
                  .getDownloadURL()
                  .then(photoURL => {
                    const chatFrenData = {
                      uid: frenID,
                      name: userSnapshot.val().name,
                      photoURL: photoURL,
                    };
                    emitter(chatFrenData);
                  });
              }
            });
          return undefined;
        });
      });
    return () => {};
  });
};

export const defaultAvatar = {
  chatBot: 'chat-bot.jpg',
  defaultUser: 'default-user.png',
};
