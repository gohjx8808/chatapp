import {yupResolver} from '@hookform/resolvers/yup';
import Clipboard from '@react-native-clipboard/clipboard';
import moment from 'moment';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  HelperText,
  Snackbar,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {UpdateProfileSchema} from '../../../helpers/validationSchema';
import ControlledDatepicker from '../../../sharedComponents/ControlledDatepicker';
import ControlledSelect from '../../../sharedComponents/ControlledSelect';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {myProfileActionCreators} from '../../myProfile/src/myProfileActions';
import {isProfileLoadingSelector} from '../../myProfile/src/myProfileSelectors';
import {goBack} from '../../navigation/src/navigationUtils';
import {selectedFrenSelector} from '../src/chatSelectors';

const ChatFriendDetailScreen = (props: PropsFromRedux) => {
  const {
    currentUser,
    toggleImagePickerDialog,
    isProfileLoading,
    submitUpdateProfile,
    selectedFren,
  } = props;

  const genders = ['Male', 'Female'];
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({resolver: yupResolver(UpdateProfileSchema)});

  const onSubmit = (data: myProfile.updateProfilePayload) => {
    const postData = {
      name: data.name,
      dob: data.dob,
      gender: data.gender,
    };
    submitUpdateProfile(postData);
  };

  const copyText = (text: string) => {
    Clipboard.setString(text);
    setIsSnackbarOpen(true);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={GlobalStyles.centerEverything}>
        <TouchableOpacity
          style={GlobalStyles.centerEverything}
          onPress={() => toggleImagePickerDialog(true)}>
          <Avatar.Image
            source={{uri: selectedFren.photoURL}}
            style={styles.iconTopSpace}
            size={80}
          />
          <Title>{selectedFren.name}</Title>
        </TouchableOpacity>
        <View style={[GlobalStyles.centerEverything, styles.form]}>
          <ControlledTextInput
            control={control}
            name="uid"
            label="UID"
            error={errors.uid}
            defaultValue={currentUser.uid}
            disabled
            rightElement={
              <TextInput.Icon
                name="content-copy"
                onPress={() => copyText(currentUser.uid)}
              />
            }
          />
          <ControlledTextInput
            control={control}
            name="email"
            label="Email"
            error={errors.email}
            defaultValue={currentUser.email}
            disabled
            rightElement={
              <TextInput.Icon
                name="content-copy"
                onPress={() => copyText(currentUser.email)}
              />
            }
          />
          <ControlledTextInput
            control={control}
            name="name"
            label="Display Name"
            error={errors.name}
            defaultValue={currentUser.name}
          />
          <ControlledDatepicker
            control={control}
            name="dob"
            placeholder="Date of birth"
            error={errors.dob}
            defaultValue={currentUser.dob}
            maximumDate={new Date(moment().subtract(18, 'years').toString())}
            label="DATE OF BIRTH"
          />
          <ControlledSelect
            control={control}
            name="gender"
            placeholder="Gender"
            error={errors.gender}
            defaultValue={currentUser.gender}
            options={genders}
          />
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={[GlobalStyles.blueBackgroundBtn, styles.btnSpace]}
            color="blue"
            loading={isProfileLoading}
            disabled={isProfileLoading}>
            Update
          </Button>
        </View>
      </ScrollView>
      <Snackbar
        visible={isSnackbarOpen}
        duration={1500}
        onDismiss={() => setIsSnackbarOpen(false)}>
        Copied!
      </Snackbar>
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    currentUser: currentUserSelector(state),
    isProfileLoading: isProfileLoadingSelector(state),
    selectedFren: selectedFrenSelector(state),
  }),
  {
    toggleImagePickerDialog: myProfileActionCreators.toggleImagePickerDialog,
    submitUpdateProfile: myProfileActionCreators.submitUpdateProfile,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChatFriendDetailScreen);

const styles = StyleSheet.create({
  iconTopSpace: {
    marginTop: '10%',
  },
  form: {
    width: '90%',
    marginTop: '10%',
    paddingBottom: '15%',
  },
  btnSpace: {
    marginTop: '8%',
  },
  copyText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  secondCopyTextVerticalSpace: {
    paddingTop: 10,
    paddingBottom: 15,
  },
});