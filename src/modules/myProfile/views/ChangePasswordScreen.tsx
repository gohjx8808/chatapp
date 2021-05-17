import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {ChangePasswordSchema} from '../../../helpers/validationSchema';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import PasswordRequirements from '../../../sharedComponents/PasswordRequirements';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {toggleDrawer} from '../../navigation/src/navigationUtils';
import {myProfileActionCreators} from '../src/myProfileActions';

type PassType = 'currentPass' | 'newPass' | 'confirmNewPass';

const ChangePasswordScreen = (props: PropsFromRedux) => {
  const {isLoadingOverlayOpen, submitChangePassword} = props;
  const [secure, setSecure] = useState({
    currentPass: true,
    newPass: true,
    confirmNewPass: true,
  });

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
    reset,
  } = useForm({resolver: yupResolver(ChangePasswordSchema)});

  const onSubmit = (data: myProfile.changePasswordPayload) => {
    reset({currentPass: '', newPass: '', confirmNewPass: ''});
    submitChangePassword(data);
  };

  const toggleSecure = (passType: PassType) => {
    setSecure({...secure, [passType]: !secure[passType]});
  };

  const renderPasswordRequirementHeader = () => {
    return (
      <>
        <ControlledPasswordInput
          control={control}
          name="currentPass"
          label="Current Password"
          error={errors.currentPass}
          passwordSecure={secure.currentPass}
          toggleSecure={() => toggleSecure('currentPass')}
        />
        <ControlledPasswordInput
          control={control}
          name="newPass"
          label="New Password"
          error={errors.newPass}
          passwordSecure={secure.newPass}
          toggleSecure={() => toggleSecure('newPass')}
        />
        <ControlledPasswordInput
          control={control}
          name="confirmNewPass"
          label="Confirm New Password"
          error={errors.confirmNewPass}
          passwordSecure={secure.confirmNewPass}
          toggleSecure={() => toggleSecure('confirmNewPass')}
        />
      </>
    );
  };

  const renderPasswordRequirementFooter = () => {
    return (
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={[GlobalStyles.blueBackgroundBtn, styles.btnSpace]}
        color="blue"
        loading={isLoadingOverlayOpen}
        disabled={isLoadingOverlayOpen}>
        Submit
      </Button>
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Change Password" />
      </Appbar.Header>
      <SafeAreaView style={styles.passwordRequirementContainer}>
        <PasswordRequirements
          password={watch('newPass')}
          confirmPassword={watch('confirmNewPass')}
          headerComponent={renderPasswordRequirementHeader()}
          footerComponent={renderPasswordRequirementFooter()}
        />
      </SafeAreaView>
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isLoadingOverlayOpen: isLoadingOverlayOpenSelector(state),
  }),
  {
    submitChangePassword: myProfileActionCreators.submitChangePassword,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChangePasswordScreen);

const styles = StyleSheet.create({
  passwordRequirementContainer: {
    marginTop: '10%',
    paddingBottom: '15%',
    marginHorizontal: '5%',
  },
  btnSpace: {
    marginVertical: '8%',
  },
});
