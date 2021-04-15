import auth from '@react-native-firebase/auth';

export const postSubmitLogin = (data: login.onLoginPayload) => {
  return auth().signInWithEmailAndPassword(data.email, data.password);
};
