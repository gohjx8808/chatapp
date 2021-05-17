import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {RegisterSchema} from '../../../helpers/validationSchema';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import PasswordRequirements from '../../../sharedComponents/PasswordRequirements';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {registrationActionCreators} from '../src/registrationActions';

const RegistrationScreen = (props: PropsFromRedux) => {
  const {submitRegister, isLoadingOverlayOpen} = props;
  const [secure, setSecure] = useState(true);
  const [confirmPassSecure, setConfirmPassSecure] = useState(true);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.backgroundView}>
      <Card style={styles.registerCard}>
        <Card.Title title="Registration" titleStyle={styles.loginTitle} />
        <Card.Content style={GlobalStyles.centerEverything}>
          <ControlledTextInput
            name={'displayName'}
            control={control}
            label="Display Name"
            error={errors.displayName}
          />
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
          />
          <ControlledPasswordInput
            name="confirmPassword"
            control={control}
            passwordSecure={confirmPassSecure}
            toggleSecure={() => setConfirmPassSecure(!confirmPassSecure)}
            label="Confirm Password"
            error={errors.confirmPassword}
          />
          <PasswordRequirements
            password={watch('password')}
            confirmPassword={watch('confirmPassword')}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(submitRegister)}
              style={GlobalStyles.blueBackgroundBtn}
              color="blue"
              loading={isLoadingOverlayOpen}
              disabled={isLoadingOverlayOpen}>
              Submit
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={[GlobalStyles.whiteBackgroundBtn, styles.btnSpace]}
              disabled={isLoadingOverlayOpen}>
              Back
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
    submitRegister: registrationActionCreators.submitRegister,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegistrationScreen);

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerCard: {
    width: '80%',
  },
  loginTitle: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  buttonContainer: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center',
  },
  btnSpace: {
    marginTop: '5%',
  },
});
