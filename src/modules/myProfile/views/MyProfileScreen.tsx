import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {userDetailsSelector} from '../../login/src/loginSelectors';
import {toggleDrawer} from '../../navigation/src/navigationUtils';

const MyProfileScreen = (props: PropsFromRedux) => {
  const {userDetails} = props;

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
          source={{uri: userDetails.photoURL}}
          style={styles.iconTopSpace}
        />
        <View style={styles.form}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Display Name"
            error={errors.name}
            defaultValue={userDetails.display_name}
          />
          <ControlledTextInput
            control={control}
            name="email"
            label="Email"
            error={errors.email}
            defaultValue={userDetails.display_name}
          />
        </View>
      </ScrollView>
    </>
  );
};

const connector = connect((state: GlobalState) => ({
  userDetails: userDetailsSelector(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MyProfileScreen);

const styles = StyleSheet.create({
  iconTopSpace: {
    marginTop: '8%',
  },
  form: {
    paddingHorizontal: '5%',
  },
});
