import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, Modal, Portal, useTheme} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {isLoadingOverlayOpenSelector} from '../src/loadingOverlaySelectors';

const LoadingOverlay = (props: PropsFromRedux) => {
  const {isLoadingOverlayOpen} = props;

  const {colors} = useTheme();

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={isLoadingOverlayOpen}
        contentContainerStyle={[
          GlobalStyles.centerEverything,
          styles.modalContainer,
        ]}>
        <ActivityIndicator color={colors.primary} />
      </Modal>
    </Portal>
  );
};

const connector = connect((state: GlobalState) => ({
  isLoadingOverlayOpen: isLoadingOverlayOpenSelector(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoadingOverlay);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 5,
    padding: '3%',
  },
});
