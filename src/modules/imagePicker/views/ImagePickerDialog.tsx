import React from 'react';
import {Dialog, List, Portal} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {imagePickerActionCreators} from '../src/imagePickerActions';
import {isImagePickerDialogOpenSelector} from '../src/imagePickerSelectors';

const ImagePickerDialog = (props: PropsFromRedux) => {
  const {
    isImagePickerDialogOpen,
    toggleImagePickerDialog,
    openCamera,
    openPhotoLibrary,
  } = props;

  const hideDialog = () => {
    toggleImagePickerDialog(false);
  };

  return (
    <Portal>
      <Dialog visible={isImagePickerDialogOpen} onDismiss={hideDialog}>
        <Dialog.Title>Edit Profile Picture</Dialog.Title>
        <Dialog.Content>
          <List.Item
            title="Photo Library"
            onPress={openPhotoLibrary}
            left={iconProp => <List.Icon {...iconProp} icon="image" />}
          />
          <List.Item
            title="Camera"
            onPress={openCamera}
            left={iconProp => <List.Icon {...iconProp} icon="camera" />}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isImagePickerDialogOpen: isImagePickerDialogOpenSelector(state),
  }),
  {
    toggleImagePickerDialog: imagePickerActionCreators.toggleImagePickerDialog,
    openCamera: imagePickerActionCreators.openCamera,
    openPhotoLibrary: imagePickerActionCreators.openPhotolibrary,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ImagePickerDialog);
