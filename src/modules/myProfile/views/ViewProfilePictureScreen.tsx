import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {goBack} from '../../navigation/src/navigationUtils';
import {myProfileActionCreators} from '../src/myProfileActions';

const ViewProfilePictureScreen = (props: PropsFromRedux) => {
  const {currentUser, toggleImagePickerDialog} = props;

  return (
    <>
      <Appbar.Header theme={{colors: {primary: 'black'}}}>
        <Appbar.Action icon="arrow-left" onPress={() => goBack()} />
        <Appbar.Content title="Profile Picture" />
        <Appbar.Action
          icon="pencil"
          onPress={() => toggleImagePickerDialog(true)}
        />
      </Appbar.Header>
      <View style={styles.profilePhotoContainer}>
        <Image
          source={{uri: currentUser.photoURL}}
          style={GlobalStyles.image}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    currentUser: currentUserSelector(state),
  }),
  {
    toggleImagePickerDialog: myProfileActionCreators.toggleImagePickerDialog,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ViewProfilePictureScreen);

const styles = StyleSheet.create({
  profilePhotoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
