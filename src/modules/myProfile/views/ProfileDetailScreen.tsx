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
  Snackbar,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {UpdateProfileSchema} from '../../../helpers/validationSchema';
import ControlledDatepicker from '../../../sharedComponents/ControlledDatepicker';
import ControlledSelect from '../../../sharedComponents/ControlledSelect';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {myProfileActionCreators} from '../src/myProfileActions';
import myProfileRouteNames from '../src/myProfileRouteNames';
import DeleteAccConfirmModal from './DeleteAccConfirmModal';

const ProfileDetailScreen = (props: PropsFromRedux) => {
  const {
    currentUser,
    isLoadingOverlayOpen,
    submitUpdateProfile,
    toggleDeleteAccModal,
  } = props;
  const {colors} = useTheme();

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
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="My Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={GlobalStyles.centerEverything}>
        <TouchableOpacity
          style={GlobalStyles.centerEverything}
          onPress={() => navigate(myProfileRouteNames.VIEW_PROFILE_PICTURE)}>
          <Avatar.Image
            source={{uri: currentUser.photoURL}}
            style={styles.iconTopSpace}
            size={80}
          />
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
            keyboardType="email-address"
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
            loading={isLoadingOverlayOpen}
            disabled={isLoadingOverlayOpen}>
            Update
          </Button>
          <Button
            mode="outlined"
            theme={{colors: {primary: colors.danger}}}
            style={[
              GlobalStyles.blueBackgroundBtn,
              styles.smallerBtnSpace,
              {borderColor: colors.danger},
            ]}
            onPress={() => toggleDeleteAccModal(true)}
            disabled={isLoadingOverlayOpen}>
            Delete Account
          </Button>
        </View>
      </ScrollView>
      <DeleteAccConfirmModal />
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
    isLoadingOverlayOpen: isLoadingOverlayOpenSelector(state),
  }),
  {
    submitUpdateProfile: myProfileActionCreators.submitUpdateProfile,
    toggleDeleteAccModal: myProfileActionCreators.toggleDeleteAccModal,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileDetailScreen);

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
  smallerBtnSpace: {
    marginTop: '5%',
  },
});
