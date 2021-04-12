import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card, HelperText} from 'react-native-paper';
import ControlledPasswordInput from '../../../ControlledPasswordInput';
import ControlledTextInput from '../../../ControlledTextInput';
import {RegisterSchema} from '../../../helpers/ValidationSchema';
import auth from '@react-native-firebase/auth';

const RegistrationScreen = () => {
  const [secure, setSecure] = useState(true);
  const [confirmPassSecure, setConfirmPassSecure] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onRegister = (data: registration.submitRegisterPayload) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('user created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.backgroundView}>
      <Card style={styles.loginCard}>
        <Card.Title title="Registration" titleStyle={styles.loginTitle} />
        <Card.Content>
          <ControlledTextInput name={'email'} control={control} label="Email" />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
          <ControlledPasswordInput
            name="password"
            control={control}
            passwordSecure={secure}
            customStyle={null}
            toggleSecure={() => setSecure(!secure)}
            label="Password"
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password?.message}
          </HelperText>
          <ControlledPasswordInput
            name="confirmPassword"
            control={control}
            passwordSecure={confirmPassSecure}
            customStyle={null}
            toggleSecure={() => setConfirmPassSecure(!confirmPassSecure)}
            label="Confirm Password"
          />
          <HelperText type="error" visible={!!errors.confirmPassword}>
            {errors.confirmPassword?.message}
          </HelperText>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(onRegister)}
              style={styles.loginButton}
              color="blue">
              Submit
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    height: '65%',
    width: '80%',
  },
  loginTitle: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  loginButton: {
    width: '60%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: '10%',
  },
  registerBtn: {
    borderColor: 'blue',
    marginTop: '5%',
  },
  corgiImage: {
    height: '20%',
    width: '40%',
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 10,
  },
});
