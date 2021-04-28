import React from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

const ImagePickerDialog = () => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ImagePickerDialog;
