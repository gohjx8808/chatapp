import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Avatar, HelperText} from 'react-native-paper';
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
        <Avatar.Image
          source={{uri: currentUser.photoURL}}
          style={styles.iconTopSpace}
        />
        <View style={styles.form}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Display Name"
            error={errors.name}
            defaultValue={currentUser.name}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
          <ControlledTextInput
            control={control}
            name="email"
            label="Email"
            error={errors.email}
            defaultValue={currentUser.email}
            disabled
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
