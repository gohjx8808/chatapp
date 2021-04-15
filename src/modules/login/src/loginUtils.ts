import auth from '@react-native-firebase/auth';

export const postSubmitLogin = (data: registration.authPayload) => {
  return auth().signInWithEmailAndPassword(data.email, data.password);
};
