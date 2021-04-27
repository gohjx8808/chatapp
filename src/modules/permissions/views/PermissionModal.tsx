import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text, Title} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {permissionActionCreators} from '../src/permissionActions';
import {
  isPermissionModalOpenSelector,
  permissionStatusSelector,
  permissionTypeSelector,
} from '../src/permissionSelectors';

const PermissionModal = (props: PropsFromRedux) => {
  const {
    permissionStatus,
    permissionType,
    isPermissionModalOpen,
    togglePermissionModal,
  } = props;

  return (
    <Portal>
      <Modal
        visible={isPermissionModalOpen}
        onDismiss={() => togglePermissionModal(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.viewWidth}>
          <Title style={styles.centerText}>Permission Required</Title>
          <Text style={[styles.centerText, styles.msgText]}>
            Full Access to your{' '}
            <Text style={styles.underlinedItalicText}>{permissionType}</Text> is
            required for ChatApp to work without error.
          </Text>
          <Text style={styles.bold}>
            Current permission: {permissionStatus}
          </Text>
          <Button
            mode="contained"
            style={styles.closeBtn}
            onPress={() => togglePermissionModal(false)}>
            Close
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    permissionType: permissionTypeSelector(state),
    permissionStatus: permissionStatusSelector(state),
    isPermissionModalOpen: isPermissionModalOpenSelector(state),
  }),
  {
    togglePermissionModal: permissionActionCreators.togglePermissionModal,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PermissionModal);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingBottom: '5%',
    borderWidth: 8,
    borderColor: '#0079bf',
  },
  sameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewWidth: {
    width: '100%',
  },
  centerIcon: {
    alignSelf: 'center',
  },
  endIcon: {
    alignSelf: 'flex-end',
  },
  centerText: {
    textAlign: 'center',
  },
  closeBtn: {
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center',
  },
  msgText: {
    paddingVertical: 20,
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  underlinedItalicText: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
});
