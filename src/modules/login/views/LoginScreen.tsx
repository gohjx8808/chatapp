import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Card, HelperText} from 'react-native-paper';
import ControlledPasswordInput from '../../../ControlledPasswordInput';
import ControlledTextInput from '../../../ControlledTextInput';
import Assets from '../../../helpers/Assets';
import GlobalStyles from '../../../helpers/GlobalStyles';
import {LoginSchema} from '../../../helpers/ValidationSchema';

const LoginScreen = () => {
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation();

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
        <Image source={Assets.corgiSquare} style={styles.corgiImage} />
        <Card.Title
          title="Welcome to ChatApp!"
          titleStyle={styles.loginTitle}
        />
        <Card.Content>
          <ControlledTextInput
            name={'email'}
            control={control}
            label="Email"
            error={errors.email}
          />
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
            validationFunction={() => {}}
            error={errors.password}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password?.message}
          </HelperText>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(onLogin)}
              style={GlobalStyles.blueBackgroundBtn}
              color="blue">
              Log In
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('register')}
              style={[GlobalStyles.whiteBackgroundBtn, styles.btnSpace]}
              color="blue">
              Register
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
    height: '65%',
    width: '80%',
  },
  loginTitle: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  buttonContainer: {
    marginVertical: '10%',
  },
  btnSpace: {
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
