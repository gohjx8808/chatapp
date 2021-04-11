import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card, HelperText} from 'react-native-paper';
import ControlledPasswordInput from '../../../ControlledPasswordInput';
import ControlledTextInput from '../../../ControlledTextInput';
import {LoginSchema} from '../../../helpers/LoginSchema';

const LoginScreen = () => {
  const [secure, setSecure] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onLogin = (data: login.onLoginPayload) => {
    console.log(data);
  };

  return (
    <View style={styles.backgroundView}>
      <Card style={styles.loginCard}>
        <Card.Title
          title="Welcome to ChatApp!"
          titleStyle={styles.loginTitle}
        />
        <Card.Content>
          <ControlledTextInput name={'Email'} control={control} />
          <HelperText type="error" visible={!!errors.Email}>
            {errors.Email?.message}
          </HelperText>
          <ControlledPasswordInput
            name="Password"
            control={control}
            passwordSecure={secure}
            customStyle={styles.topSpace}
            toggleSecure={() => setSecure(!secure)}
          />
          <HelperText type="error" visible={!!errors.Password}>
            {errors.Password?.message}
          </HelperText>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(onLogin)}
              style={styles.loginButton}
              color="blue">
              Log In
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    height: '60%',
    width: '80%',
  },
  loginTitle: {
    textAlign: 'center',
  },
  topSpace: {
    marginTop: 20,
  },
  loginButton: {
    width: '50%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: '10%',
  },
});
