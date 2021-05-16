import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Modal, Portal} from 'react-native-paper';
import {default as MaterialCommunityIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../../../helpers/globalStyles';

interface EnlargedMessageImageModalOwnProps {
  isShowEnlargedImage: boolean;
  toggleEnlargedModal: () => void;
  enlargedImageURL: string;
}

const EnlargedMessageImageModal = (
  props: EnlargedMessageImageModalOwnProps,
) => {
  const {isShowEnlargedImage, toggleEnlargedModal, enlargedImageURL} = props;

  return (
    <Portal>
      <Modal
        visible={isShowEnlargedImage}
        onDismiss={toggleEnlargedModal}
        contentContainerStyle={styles.modalContainer}>
        <FastImage
          source={{uri: enlargedImageURL}}
          style={[GlobalStyles.image, styles.fastImageContainer]}
          resizeMode={FastImage.resizeMode.contain}
        />
        <MaterialCommunityIcon
          name="close"
          color="white"
          size={35}
          onPress={toggleEnlargedModal}
        />
      </Modal>
    </Portal>
  );
};

export default EnlargedMessageImageModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  fastImageContainer: {
    height: '85%',
  },
});
