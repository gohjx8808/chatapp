import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Modal, Portal, useTheme} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {chatActionCreators} from '../../chat/src/chatActions';
import {isDeleteFriendConfirmModalOpenSelector} from '../../chat/src/chatSelectors';

const LoadingOverlay = (props: PropsFromRedux) => {
  const {
    isDeleteFriendConfirmModalOpen,
    toggleDeleteFriendConfirmModal,
  } = props;

  const {colors} = useTheme();

  return (
    <Portal>
      <Modal
        visible={isDeleteFriendConfirmModalOpen}
        onDismiss={() => toggleDeleteFriendConfirmModal(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={[GlobalStyles.centerEverything, GlobalStyles.fullWidth]}>
          <ActivityIndicator color={colors.primary} />
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
  }),
  {
    toggleDeleteFriendConfirmModal:
      chatActionCreators.toggleDeleteFriendConfirmModal,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoadingOverlay);

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
