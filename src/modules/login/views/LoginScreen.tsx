import {yupResolver} from '@hookform/resolvers/yup';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Card, HelperText} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import Assets from '../../../helpers/assets';
import {googleSignInWebClientID} from '../../../helpers/constants';
import GlobalStyles from '../../../helpers/globalStyles';
import {LoginSchema} from '../../../helpers/validationSchema';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {navigate} from '../../navigation/src/navigationUtils';
import routeNames from '../../navigation/src/routeNames';
import {loginActionCreators} from '../src/loginActions';

const LoginScreen = (props: propsFromRedux) => {
  const [secure, setSecure] = useState(true);

  const {submitLogin, isLoadingOverlayOpen} = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleSignInWebClientID,
    });
  }, []);

  const onSubmit = (values: login.onLoginPayload) => {
    submitLogin(values);
    reset({
      email: '',
      password: '',
    });
  };

  const renderForgotPaswordText = (
    <HelperText
      type="info"
      onPress={() => navigate(routeNames.FORGOT_PASSWORD)}
      style={styles.forgotPassword}>
      Forgot Password?
    </HelperText>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.backgroundView}>
      <Card style={styles.loginCard}>
        <FastImage source={Assets.corgiSquare} style={styles.corgiImage} />
        <Card.Title
          title="Welcome to ChatApp!"
          titleStyle={styles.loginTitle}
        />
        <Card.Content style={GlobalStyles.centerEverything}>
          <ControlledTextInput
            name={'email'}
            control={control}
            label="Email"
            error={errors.email}
            keyboardType="email-address"
          />
          <ControlledPasswordInput
            name="password"
            control={control}
            passwordSecure={secure}
            toggleSecure={() => setSecure(!secure)}
            label="Password"
            error={errors.password}
            footerAttachedComponent={renderForgotPaswordText}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={GlobalStyles.blueBackgroundBtn}
              color="blue"
              loading={isLoadingOverlayOpen}
              disabled={isLoadingOverlayOpen}>
              Log In
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigate(routeNames.REGISTER)}
              style={[GlobalStyles.whiteBackgroundBtn, styles.btnSpace]}
              color="blue"
              disabled={isLoadingOverlayOpen}>
              Register
            </Button>
          </View>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isLoadingOverlayOpen: isLoadingOverlayOpenSelector(state),
  }),
  {
    submitLogin: loginActionCreators.submitLogin,
  },
);

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginScreen);

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    width: '80%',
  },
  loginTitle: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: '5%',
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
  forgotPassword: {
    color: 'blue',
    alignSelf: 'flex-end',
    paddingBottom: 0,
  },
});
