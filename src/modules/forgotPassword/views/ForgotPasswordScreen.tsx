import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Card, HelperText, Text} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import Assets from '../../../helpers/assets';
import GlobalStyles from '../../../helpers/globalStyles';
import {ForgotPasswordSchema} from '../../../helpers/validationSchema';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {loginActionCreators} from '../../login/src/loginActions';
import {navigate} from '../../navigation/src/navigationUtils';
import routeNames from '../../navigation/src/routeNames';

const ForgotPasswordScreen = (props: propsFromRedux) => {
  const {isLoadingOverlayOpen} = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = (values: forgotPassword.submitForgotPasswordPayload) => {
    reset({
      email: '',
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.backgroundView}>
      <Card style={styles.loginCard}>
        <Image source={Assets.corgiSquare} style={styles.corgiImage} />
        <Text style={[GlobalStyles.centerText, styles.declarationText]}>
          Please enter your registered email address below. You will receive an
          email with a link to reset your password shortly.
        </Text>
        <Card.Content style={GlobalStyles.centerEverything}>
          <ControlledTextInput
            name={'email'}
            control={control}
            label="Email"
            error={errors.email}
            keyboardType="email-address"
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={[GlobalStyles.blueBackgroundBtn, styles.btnSpace]}
              color="blue"
              loading={isLoadingOverlayOpen}
              disabled={isLoadingOverlayOpen}>
              Send email
            </Button>
            <HelperText type="info">Remember your password?</HelperText>
            <Button
              mode="outlined"
              onPress={() => navigate(routeNames.LOGIN)}
              style={GlobalStyles.whiteBackgroundBtn}
              color="blue"
              disabled={isLoadingOverlayOpen}>
              Log In
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

export default connector(ForgotPasswordScreen);

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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  btnSpace: {
    marginBottom: '5%',
  },
  corgiImage: {
    height: '25%',
    width: '45%',
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 10,
    marginBottom: '5%',
  },
  declarationText: {
    paddingHorizontal: '7%',
    color: '#606060',
    fontSize: 13,
    marginBottom: '5%',
  },
});
