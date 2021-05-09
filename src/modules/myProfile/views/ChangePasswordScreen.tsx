import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {ChangePasswordSchema} from '../../../helpers/validationSchema';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {toggleDrawer} from '../../navigation/src/navigationUtils';
import {myProfileActionCreators} from '../src/myProfileActions';
import {isProfileLoadingSelector} from '../src/myProfileSelectors';

const ChangePasswordScreen = (props: PropsFromRedux) => {
  const {isProfileLoading, submitUpdateProfile} = props;

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({resolver: yupResolver(ChangePasswordSchema)});

  const onSubmit = (data: myProfile.updateProfilePayload) => {
    const postData = {
      name: data.name,
      dob: data.dob,
      gender: data.gender,
    };
    submitUpdateProfile(postData);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Change Password" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={GlobalStyles.centerEverything}>
        <View style={[GlobalStyles.centerEverything, styles.form]}>
          <ControlledTextInput
            control={control}
            name="currentPass"
            label="Current Password"
            error={errors.currentPass}
          />
          <ControlledTextInput
            control={control}
            name="newPass"
            label="New Password"
            error={errors.newPass}
          />
          <ControlledTextInput
            control={control}
            name="confirmNewPass"
            label="Confirm New Password"
            error={errors.confirmNewPass}
          />
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={[GlobalStyles.blueBackgroundBtn, styles.btnSpace]}
            color="blue"
            loading={isProfileLoading}
            disabled={isProfileLoading}>
            Submit
          </Button>
        </View>
      </ScrollView>
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
  form: {
    width: '90%',
    marginTop: '15%',
    paddingBottom: '15%',
  },
  btnSpace: {
    marginTop: '8%',
  },
});
