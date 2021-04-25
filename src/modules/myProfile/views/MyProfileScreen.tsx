import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Avatar, HelperText} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import ControlledSelect from '../../../sharedComponents/ControlledSelect';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {toggleDrawer} from '../../navigation/src/navigationUtils';

const MyProfileScreen = (props: PropsFromRedux) => {
  const {currentUser} = props;

  const {
    control,
    formState: {errors},
  } = useForm();

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="My Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={GlobalStyles.centerEverything}>
        <TouchableOpacity style={GlobalStyles.centerEverything}>
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
          <ControlledTextInput
            control={control}
            name="dob"
            label="Date of birth"
            error={errors.dob}
            defaultValue={currentUser.dob}
          />
          <ControlledSelect
            control={control}
            name="gender"
            placeholder="Gender"
            error={errors.gender}
            defaultValue={currentUser.gender}
            options={['Male', 'Female']}
          />
        </View>
      </ScrollView>
    </>
  );
};

const connector = connect((state: GlobalState) => ({
  currentUser: currentUserSelector(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MyProfileScreen);

const styles = StyleSheet.create({
  iconTopSpace: {
    marginTop: '8%',
  },
  form: {
    width: '90%',
    marginTop: '5%',
  },
});
