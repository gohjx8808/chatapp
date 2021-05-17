import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text, Title, useTheme} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {chatActionCreators} from '../src/chatActions';
import {
  isDeleteFriendConfirmModalOpenSelector,
  selectedFrenSelector,
} from '../src/chatSelectors';

const DeleteFriendConfirmModal = (props: PropsFromRedux) => {
  const {
    isDeleteFriendConfirmModalOpen,
    toggleDeleteFriendConfirmModal,
    isLoadingOverlayOpen,
    deleteFriend,
    selectedFren,
  } = props;

  const {colors} = useTheme();

  return (
    <Portal>
      <Modal
        visible={isDeleteFriendConfirmModalOpen}
        onDismiss={() => toggleDeleteFriendConfirmModal(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={[GlobalStyles.centerEverything, GlobalStyles.fullWidth]}>
          <Title style={styles.titleText}>Delete Friend</Title>
          <View style={styles.bottomSpace}>
            <Text style={GlobalStyles.centerText}>
              Are you sure you wish to unfriend{' '}
              <Text style={GlobalStyles.boldText}>
                [Name: {selectedFren.name}, UID: {selectedFren.uid}]{' '}
              </Text>
              ?{'\n'}
            </Text>
            <Text
              style={[
                GlobalStyles.boldText,
                GlobalStyles.centerText,
                {color: colors.danger},
              ]}>
              The chat history of the friend will also be deleted. This cannot
              be undone!
            </Text>
          </View>
          <View style={styles.sameRow}>
            <Button
              mode="contained"
              style={GlobalStyles.sameRowButtonWidth}
              theme={{colors: {primary: colors.danger}}}
              onPress={() => toggleDeleteFriendConfirmModal(false)}
              disabled={isLoadingOverlayOpen}>
              Cancel
            </Button>
            <Button
              mode="outlined"
              style={[
                GlobalStyles.sameRowButtonWidth,
                {borderColor: colors.danger},
              ]}
              onPress={() => deleteFriend(selectedFren.uid)}
              disabled={isLoadingOverlayOpen}
              loading={isLoadingOverlayOpen}
              theme={{colors: {primary: colors.danger}}}>
              Confirm
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isDeleteFriendConfirmModalOpen: isDeleteFriendConfirmModalOpenSelector(
      state,
    ),
    isLoadingOverlayOpen: isLoadingOverlayOpenSelector(state),
    selectedFren: selectedFrenSelector(state),
  }),
  {
    toggleDeleteFriendConfirmModal:
      chatActionCreators.toggleDeleteFriendConfirmModal,
    deleteFriend: chatActionCreators.deleteFriend,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeleteFriendConfirmModal);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  sameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  titleText: {
    paddingTop: 10,
  },
  bottomSpace: {
    marginBottom: '10%',
    marginTop: '2%',
    width: '100%',
  },
  customSelectWidth: {flexDirection: 'column', width: '43%', marginRight: 5},
  customSelectValue: {
    paddingTop: '10%',
    paddingHorizontal: '12%',
  },
  customInputWidth: {flexDirection: 'column', width: '58%'},
});
