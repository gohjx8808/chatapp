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
import {toggleDrawer} from '../../navigation/src/navigationUtils';
import {myProfileActionCreators} from '../src/myProfileActions';
import {isProfileLoadingSelector} from '../src/myProfileSelectors';

type PassType = 'currentPass' | 'newPass' | 'confirmNewPass';

const ChangePasswordScreen = (props: PropsFromRedux) => {
  const {isProfileLoading, submitUpdateProfile} = props;
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
  } = useForm({resolver: yupResolver(ChangePasswordSchema)});

  const onSubmit = (data: myProfile.updateProfilePayload) => {
    const postData = {
      name: data.name,
      dob: data.dob,
      gender: data.gender,
    };
    submitUpdateProfile(postData);
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
        loading={isProfileLoading}
        disabled={isProfileLoading}>
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
    isProfileLoading: isProfileLoadingSelector(state),
  }),
  {
    submitUpdateProfile: myProfileActionCreators.submitUpdateProfile,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChangePasswordScreen);

const styles = StyleSheet.create({
  iconTopSpace: {
    marginTop: '10%',
  },
  passwordRequirementContainer: {
    marginTop: '10%',
    paddingBottom: '15%',
    paddingHorizontal: '5%',
  },
  btnSpace: {
    marginVertical: '8%',
  },
});
