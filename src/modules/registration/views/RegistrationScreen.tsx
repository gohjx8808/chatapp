import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Card, HelperText} from 'react-native-paper';
import ControlledPasswordInput from '../../../ControlledPasswordInput';
import ControlledTextInput from '../../../ControlledTextInput';
import Assets from '../../../helpers/Assets';
import {LoginSchema} from '../../../helpers/LoginSchema';

const RegistrationScreen = () => {
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
        <Image source={Assets.corgiSquare} style={styles.corgiImage} />
        <Card.Title title="Registration" titleStyle={styles.loginTitle} />
        <Card.Content>
          <ControlledTextInput name={'Email'} control={control} />
          <HelperText type="error" visible={!!errors.Email}>
            {errors.Email?.message}
          </HelperText>
          <ControlledPasswordInput
            name="Password"
            control={control}
            passwordSecure={secure}
            customStyle={null}
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
