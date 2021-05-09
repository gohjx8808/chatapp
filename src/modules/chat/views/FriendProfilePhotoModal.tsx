import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton, Modal, Portal} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {chatActionCreators} from '../src/chatActions';
import {
  isFriendProfilePhotoModalOpenSelector,
  selectedFrenSelector,
} from '../src/chatSelectors';

const FriendProfilePhotoModal = (props: PropsFromRedux) => {
  const {
    isFriendProfilePhotoModalOpen,
    toggleFriendProfilePhoto,
    selectedFren,
  } = props;

  return (
    <Portal>
      <Modal
        visible={isFriendProfilePhotoModalOpen}
        onDismiss={() => toggleFriendProfilePhoto(false)}
        contentContainerStyle={styles.modalContainer}>
        <IconButton
          icon="close"
          style={styles.endIcon}
          color="white"
          onPress={() => toggleFriendProfilePhoto(false)}
        />
        <View style={[GlobalStyles.centerEverything, GlobalStyles.fullWidth]}>
          <View style={styles.bottomSpace}>
            <Image
              source={{uri: selectedFren.photoURL}}
              style={GlobalStyles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isFriendProfilePhotoModalOpen: isFriendProfilePhotoModalOpenSelector(state),
    selectedFren: selectedFrenSelector(state),
  }),
  {
    toggleFriendProfilePhoto: chatActionCreators.toggleFriendProfilePhoto,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FriendProfilePhotoModal);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'black',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: '5%',
    height: '60%',
  },
  bottomSpace: {
    marginBottom: '10%',
    marginTop: '2%',
    width: '100%',
    height: '70%',
  },
  endIcon: {
    alignSelf: 'flex-end',
  },
});
