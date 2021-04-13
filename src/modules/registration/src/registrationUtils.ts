import auth from '@react-native-firebase/auth';

export const submitRegister = (data: registration.submitRegisterPayload) => {
  return auth().createUserWithEmailAndPassword(data.email, data.password);
};
