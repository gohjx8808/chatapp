import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  Title,
} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {statusActionCreators} from '../src/statusActions';
import {
  isApiSuccessSelector,
  isStatusModalOpenSelector,
  statusMsgSelector,
} from '../src/statusSelectors';

const StatusModal = (props: PropsFromRedux) => {
  const {isStatusModalOpen, toggleStatusModal, isApiSuccess, statusMsg} = props;

  return (
    <Portal>
      <Modal
        visible={isStatusModalOpen}
        onDismiss={() => toggleStatusModal(false)}
        contentContainerStyle={[
          styles.modalContainer,
          isApiSuccess ? styles.lightGreenBorder : styles.lightRedBorder,
        ]}>
        <View style={styles.viewWidth}>
          <IconButton
            icon={
              isApiSuccess ? 'check-circle-outline' : 'close-circle-outline'
            }
            size={60}
            style={styles.centerIcon}
            color={isApiSuccess ? 'green' : 'red'}
          />
          <Title
            style={[
              styles.centerText,
              isApiSuccess ? styles.successColor : styles.errorColor,
            ]}>
            {isApiSuccess ? 'Success!' : 'Oops!'}
          </Title>
          <Text style={[styles.centerText, styles.msgText]}>{statusMsg}</Text>
          <Button
            mode="contained"
            color={isApiSuccess ? 'green' : 'red'}
            style={styles.closeBtn}
            onPress={() => toggleStatusModal(false)}>
            Close
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isStatusModalOpen: isStatusModalOpenSelector(state),
    isApiSuccess: isApiSuccessSelector(state),
    statusMsg: statusMsgSelector(state),
  }),
  {
    toggleStatusModal: statusActionCreators.toggleStatusModal,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(StatusModal);

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
  successColor: {
    color: 'green',
  },
  errorColor: {
    color: 'red',
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
  lightGreenBorder: {
    borderColor: '#90EE90',
  },
  lightRedBorder: {
    borderColor: '#FFCCCB',
  },
});
