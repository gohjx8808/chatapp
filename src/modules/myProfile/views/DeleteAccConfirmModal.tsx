import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text, Title, useTheme} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {myProfileActionCreators} from '../src/myProfileActions';
import {isDeleteAccConfirmModalOpenSelector} from '../src/myProfileSelectors';

const DeleteAccConfirmModal = (props: PropsFromRedux) => {
  const {
    isLoadingOverlayOpen,
    submitDeleteAcc,
    toggleDeleteAccModal,
    isDeleteAccModalOpen,
  } = props;

  const {colors} = useTheme();

  return (
    <Portal>
      <Modal
        visible={isDeleteAccModalOpen}
        onDismiss={() => toggleDeleteAccModal(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={[GlobalStyles.centerEverything, GlobalStyles.fullWidth]}>
          <Title style={styles.titleText}>Delete Account</Title>
          <View style={styles.bottomSpace}>
            <Text style={GlobalStyles.centerText}>
              Are you sure you wish to delete your account?
            </Text>
            <Text
              style={[
                GlobalStyles.boldText,
                GlobalStyles.centerText,
                {color: colors.danger},
              ]}>
              This cannot be undone!
            </Text>
          </View>
          <View style={styles.sameRow}>
            <Button
              mode="contained"
              style={GlobalStyles.sameRowButtonWidth}
              theme={{colors: {primary: colors.danger}}}
              onPress={() => toggleDeleteAccModal(false)}
              disabled={isLoadingOverlayOpen}>
              Cancel
            </Button>
            <Button
              mode="outlined"
              style={[
                GlobalStyles.sameRowButtonWidth,
                {borderColor: colors.danger},
              ]}
              onPress={() => submitDeleteAcc()}
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
    isLoadingOverlayOpen: isLoadingOverlayOpenSelector(state),
    isDeleteAccModalOpen: isDeleteAccConfirmModalOpenSelector(state),
  }),
  {
    submitDeleteAcc: myProfileActionCreators.submitDeleteAcc,
    toggleDeleteAccModal: myProfileActionCreators.toggleDeleteAccModal,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeleteAccConfirmModal);

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
});
