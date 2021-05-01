import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Title} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {chatActionCreators} from '../src/chatActions';
import {isAddFrenModalOpenSelector} from '../src/chatSelectors';

const AddFrensModal = (props: PropsFromRedux) => {
  const {isAddFrenModalOpen, toggleAddFrenModal} = props;

  const {
    control,
    formState: {errors},
  } = useForm();

  return (
    <Portal>
      <Modal
        visible={isAddFrenModalOpen}
        onDismiss={() => toggleAddFrenModal(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={[GlobalStyles.centerEverything, styles.viewWidth]}>
          <Title style={styles.titleText}>Add Friends</Title>
          <ControlledTextInput
            name="uid"
            label="Friend's UID"
            control={control}
            error={errors.uid}
          />
          <View style={styles.sameRow}>
            <Button
              mode="outlined"
              style={[
                GlobalStyles.whiteBackgroundBtn,
                GlobalStyles.sameRowButtonWidth,
              ]}
              onPress={() => toggleAddFrenModal(false)}>
              Close
            </Button>
            <Button
              mode="contained"
              style={GlobalStyles.sameRowButtonWidth}
              onPress={() => toggleAddFrenModal(false)}>
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
    isAddFrenModalOpen: isAddFrenModalOpenSelector(state),
  }),
  {
    toggleAddFrenModal: chatActionCreators.toggleAddFrenModal,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddFrensModal);

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
  viewWidth: {
    width: '100%',
  },
  centerIcon: {
    alignSelf: 'center',
  },
  endIcon: {
    alignSelf: 'flex-end',
  },
  titleText: {
    paddingTop: 10,
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
