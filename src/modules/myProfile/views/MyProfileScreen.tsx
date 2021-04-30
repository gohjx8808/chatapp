import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Avatar, Button, HelperText} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {UpdateProfileSchema} from '../../../helpers/validationSchema';
import ControlledDatepicker from '../../../sharedComponents/ControlledDatepicker';
import ControlledSelect from '../../../sharedComponents/ControlledSelect';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {toggleDrawer} from '../../navigation/src/navigationUtils';
import {myProfileActionCreators} from '../src/myProfileActions';
import {isProfileLoadingSelector} from '../src/myProfileSelectors';

const MyProfileScreen = (props: PropsFromRedux) => {
  const {
    currentUser,
    toggleImagePickerDialog,
    isProfileLoading,
    submitUpdateProfile,
  } = props;

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({resolver: yupResolver(UpdateProfileSchema)});

  const onSubmit = (data: myProfile.updateProfilePayload) => {
    const postData = {
      name: data.name,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
    };
    submitUpdateProfile(postData);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="My Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={GlobalStyles.centerEverything}>
        <TouchableOpacity
          style={GlobalStyles.centerEverything}
          onPress={() => toggleImagePickerDialog(true)}>
          <Avatar.Image
            source={{uri: currentUser.photoURL}}
            style={styles.iconTopSpace}
            size={80}
          />
          <HelperText type="info">Touch to edit profile photo</HelperText>
        </TouchableOpacity>
        <View style={[GlobalStyles.centerEverything, styles.form]}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Display Name"
            error={errors.name}
            defaultValue={currentUser.name}
          />
          <ControlledTextInput
            control={control}
            name="email"
            label="Email"
            error={errors.email}
            defaultValue={currentUser.email}
            disabled
          />
          <ControlledDatepicker
            control={control}
            name="dob"
            placeholder="Date of birth"
            error={errors.dob}
            defaultValue={currentUser.dob}
            maximumDate={new Date(moment().subtract(18, 'years').toString())}
          />
          <ControlledSelect
            control={control}
            name="gender"
            placeholder="Gender"
            error={errors.gender}
            defaultValue={currentUser.gender}
            options={['Male', 'Female']}
          />
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={GlobalStyles.blueBackgroundBtn}
            color="blue"
            loading={isProfileLoading}
            disabled={isProfileLoading}>
            Update
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    currentUser: currentUserSelector(state),
    isProfileLoading: isProfileLoadingSelector(state),
  }),
  {
    toggleImagePickerDialog: myProfileActionCreators.toggleImagePickerDialog,
    submitUpdateProfile: myProfileActionCreators.submitUpdateProfile,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MyProfileScreen);

const styles = StyleSheet.create({
  iconTopSpace: {
    marginTop: '10%',
  },
  form: {
    width: '90%',
    marginTop: '10%',
  },
});
