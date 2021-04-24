import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {userDetailsSelector} from '../../login/src/loginSelectors';
import {toggleDrawer} from '../../navigation/src/navigationUtils';

const MyProfileScreen = (props: PropsFromRedux) => {
  const {userDetails} = props;

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
});
