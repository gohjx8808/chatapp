import database from '@react-native-firebase/database';
import React, {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {
  Actions,
  ActionsProps,
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  Day,
  DayProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Time,
  TimeProps,
} from 'react-native-gifted-chat';
import {Appbar, Avatar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, ConnectedProps} from 'react-redux';
import assets from '../../../helpers/assets';
import {
  dialogFlowClientEmail,
  dialogFlowPrivateKey,
  dialogFlowProjectID,
} from '../../../helpers/constants';
import {imagePickerActionCreators} from '../../imagePicker/src/imagePickerActions';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {goBack, navigate} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';
import {messagesSelector, selectedFrenSelector} from '../src/chatSelectors';

const ChatScreen = (props: PropsFromRedux) => {
  const {
    messages,
    currentUser,
    getChatMessages,
    selectedFren,
    getChatFriendList,
    toggleImagePickerDialog,
  } = props;

  const {colors} = useTheme();

  const databaseRef = `/chat/${currentUser.uid}/${selectedFren.uid}`;

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogFlowClientEmail,
      dialogFlowPrivateKey,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogFlowProjectID,
    );
  }, []);

  const onSend = (newMessages: IMessage[]) => {
    const parsedMsg = newMessages[0];
    database().ref(databaseRef).push(parsedMsg);
    getChatMessages();
    if (selectedFren.uid === 'FAQ Bot') {
      const message = parsedMsg.text;
      Dialogflow_V2.requestQuery(
        message,
        response =>
          handleDialogflowResponse(response as chat.dialogFlowResponse),
        error => console.log(error),
      );
    }
  };

  const handleDialogflowResponse = (response: chat.dialogFlowResponse) => {
    const textResponse =
      response.queryResult.fulfillmentMessages[0].text.text[0];
    const msg = {
      _id: messages.length + 1,
      text: textResponse,
      createdAt: new Date(),
      user: selectedFren,
    };
    database().ref(databaseRef).push(msg);
    getChatMessages();
  };

  const renderCustomDay = (dayProps: DayProps<IMessage>) => {
    return (
      <Day
        {...dayProps}
        wrapperStyle={styles.dateWrapper}
        textStyle={styles.dateText}
      />
    );
  };

  const renderCustomBubble = (bubbleProps: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...bubbleProps}
        textStyle={{
          right: {color: 'black'},
          left: {color: 'black'},
        }}
        wrapperStyle={{
          right: {backgroundColor: '#98FB98'}, //green
          left: {
            backgroundColor: 'white',
          },
        }}
      />
    );
  };

  const renderCustomTime = (timeProps: TimeProps<IMessage>) => {
    return (
      <Time
        {...timeProps}
        timeTextStyle={{
          right: {
            color: '#9E9E9E',
          },
          left: {
            color: '#9E9E9E',
          },
        }}
      />
    );
  };

  const renderActions = (actionProps: Readonly<ActionsProps>) => {
    return (
      <Actions
        {...actionProps}
        icon={() => (
          <Icon
            name={'attachment'}
            size={28}
            color={colors.primary}
            onPress={() => toggleImagePickerDialog(true)}
          />
        )}
      />
    );
  };

  const renderCustomInputToolbar = (toolbarProps: InputToolbarProps) => {
    return (
      <InputToolbar
        {...toolbarProps}
        containerStyle={styles.textInputContainer}
      />
    );
  };

  const renderCustomComposer = (composerProps: ComposerProps) => {
    return (
      <Composer {...composerProps} textInputStyle={styles.zeroLineheight} />
    );
  };

  return (
    <ImageBackground source={assets.chatBg} style={styles.chatBg}>
      <Appbar.Header>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
            goBack();
            getChatFriendList();
          }}
        />
        <Appbar.Content title={selectedFren.name} />
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
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: currentUser.uid,
          name: currentUser.name,
          avatar: currentUser.photoURL,
        }}
        renderDay={renderCustomDay}
        renderBubble={renderCustomBubble}
        renderTime={renderCustomTime}
        renderInputToolbar={renderCustomInputToolbar}
        placeholder="Type a message"
        renderAvatar={() => <View />}
        renderActions={renderActions}
        renderComposer={renderCustomComposer}
        scrollToBottom
      />
    </ImageBackground>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    messages: messagesSelector(state),
    currentUser: currentUserSelector(state),
    selectedFren: selectedFrenSelector(state),
  }),
  {
    getChatMessages: chatActionCreators.getChatMessages,
    getChatFriendList: chatActionCreators.getChatFrenList,
    toggleImagePickerDialog: imagePickerActionCreators.toggleImagePickerDialog,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChatScreen);

const styles = StyleSheet.create({
  chatBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  dateWrapper: {
    backgroundColor: 'white',
    width: '25%',
    borderRadius: 20,
    paddingVertical: 3,
  },
  dateText: {
    textAlign: 'center',
  },
  textInputContainer: {
    borderRadius: 10,
  },
  zeroLineheight: {
    lineHeight: 0,
  },
});
