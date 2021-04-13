import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';

const StatusModal = () => {
  return (
    <Portal>
      <Modal
        visible={true}
        //   onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: '40%',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
