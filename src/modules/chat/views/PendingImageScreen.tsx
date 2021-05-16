import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Appbar, Avatar, TextInput, useTheme} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {uploadedPhotoSelector} from '../../imagePicker/src/imagePickerSelectors';
import {goBack, navigate} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';
import {selectedFrenSelector} from '../src/chatSelectors';

const PendingImageScreen = (props: PropsFromRedux) => {
  const {
    selectedFren,
    uploadedPhoto,
    onPendingImageUnmount,
    sendImageMsg,
  } = props;

  const {colors} = useTheme();

  const [textMsg, setTextMsg] = useState('');

  useEffect(
    () => () => {
      onPendingImageUnmount();
    },
    [onPendingImageUnmount],
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
            goBack();
          }}
        />
        <Appbar.Content title="Select Image" />
        <TouchableOpacity
          onPress={() => navigate(chatRouteNames.CHAT_FRIEND_DETAIL)}>
          <Avatar.Image
            size={36}
            source={{
              uri: selectedFren.photoURL,
            }}
          />
        </TouchableOpacity>
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wholeFlex}>
        <View style={GlobalStyles.centerEverything}>
          {uploadedPhoto.path && (
            <View style={styles.uploadedImageContainer}>
              <Image
                source={{uri: uploadedPhoto.path}}
                style={GlobalStyles.image}
                resizeMode="contain"
              />
            </View>
          )}
          <TextInput
            mode="outlined"
            label="Messages"
            value={textMsg}
            onChangeText={text => setTextMsg(text)}
            theme={{colors: {primary: colors.primary}}}
            autoCapitalize="none"
            style={[GlobalStyles.inputsWidth, styles.imageTextInput]}
            dense
            right={
              <TextInput.Icon
                name="send"
                color={colors.primary}
                onPress={() => sendImageMsg(textMsg)}
              />
            }
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    selectedFren: selectedFrenSelector(state),
    uploadedPhoto: uploadedPhotoSelector(state),
  }),
  {
    onPendingImageUnmount: chatActionCreators.onPendingImageUnmount,
    sendImageMsg: chatActionCreators.sendImageMsg,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PendingImageScreen);

const styles = StyleSheet.create({
  wholeFlex: {
    flex: 1,
  },
  uploadedImageContainer: {
    width: '95%',
    height: '80%',
  },
  imageTextInput: {
    marginTop: 5,
  },
});
