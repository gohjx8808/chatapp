import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import FastImage from 'react-native-fast-image';
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
  MessageImageProps,
  Time,
  TimeProps,
} from 'react-native-gifted-chat';
import {Appbar, Avatar, useTheme} from 'react-native-paper';
import {default as Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, ConnectedProps} from 'react-redux';
import assets from '../../../helpers/assets';
import {
  dialogFlowClientEmail,
  dialogFlowPrivateKey,
  dialogFlowProjectID,
} from '../../../helpers/constants';
import {defaultChatMsgLength} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {goBack, navigate} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';
import {messagesSelector, selectedFrenSelector} from '../src/chatSelectors';
import EnlargedMessageImageModal from './EnlargedMessageImageModal';

const ChatScreen = (props: PropsFromRedux) => {
  const {
    messages,
    currentUser,
    getChatMessages,
    selectedFren,
    getChatFriendList,
    selectChatImage,
  } = props;

  const [isShowEnlargedImage, setIsShowEnlargedImage] = useState(false);
  const [enlargedImageURL, setEnlargedImageURL] = useState('');
  const [chatMsgLength, setChatMsgLength] = useState(defaultChatMsgLength);

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
    getChatMessages(chatMsgLength);
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
    getChatMessages(chatMsgLength);
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
            name="attachment"
            size={28}
            color={colors.primary}
            onPress={() => selectChatImage()}
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

  const renderCustomMessageImage = (
    messageImageprops: MessageImageProps<IMessage>,
  ) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setEnlargedImageURL(messageImageprops.currentMessage!.image!);
          setIsShowEnlargedImage(true);
        }}>
        <FastImage
          source={{uri: messageImageprops.currentMessage!.image}}
          style={styles.image}
        />
      </TouchableOpacity>
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
        renderMessageImage={renderCustomMessageImage}
        infiniteScroll
        onLoadEarlier={() => {
          getChatMessages(chatMsgLength + 20);
          setChatMsgLength(chatMsgLength + 20);
        }}
        loadEarlier
      />
      <EnlargedMessageImageModal
        isShowEnlargedImage={isShowEnlargedImage}
        toggleEnlargedModal={() => setIsShowEnlargedImage(false)}
        enlargedImageURL={enlargedImageURL}
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
    selectChatImage: chatActionCreators.selectChatImage,
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
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
});
