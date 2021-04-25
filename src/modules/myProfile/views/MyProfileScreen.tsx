import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Avatar, HelperText, Text} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
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
          <HelperText type="error" visible={!!errors.name}>
            {errors.name?.message}
          </HelperText>
          <ControlledTextInput
            control={control}
            name="email"
            label="Email"
            error={errors.email}
            defaultValue={currentUser.email}
            disabled
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
          <ControlledTextInput
            control={control}
            name="dob"
            label="Date of birth"
            error={errors.dob}
            defaultValue={currentUser.dob}
          />
          <HelperText type="error" visible={!!errors.dob}>
            {errors.dob?.message}
          </HelperText>
          <TouchableOpacity
            style={[GlobalStyles.centerEverything, {width: '100%'}]}>
            <View
              style={{
                borderColor: 'black',
                borderWidth: 0.5,
                width: '95%',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 4,
              }}>
              <Text style={{fontSize: 16, color: '#616161'}}>Gender</Text>
            </View>
          </TouchableOpacity>
          <HelperText type="error" visible={!!errors.gender}>
            {errors.gender?.message}
          </HelperText>
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
