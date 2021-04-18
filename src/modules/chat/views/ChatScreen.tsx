import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {
  Bubble,
  BubbleProps,
  Day,
  DayProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Time,
  TimeProps,
} from 'react-native-gifted-chat';
import {Appbar} from 'react-native-paper';
import Assets from '../../../helpers/assets';
import {
  dialogFlowClientEmail,
  dialogFlowPrivateKey,
  dialogFlowProjectID,
} from '../../../helpers/constants';
import database from '@react-native-firebase/database';

const ChatScreen = () => {
  const botUser = {
    _id: 2,
    name: 'FAQ Bot',
    avatar: 'https://placeimg.com/140/140/any',
  };

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogFlowClientEmail,
      dialogFlowPrivateKey,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogFlowProjectID,
    );
  }, []);

  useEffect(() => {
    database()
      .ref(`/chat/${botUser.name}`)
      .limitToLast(20)
      .on('child_added', snapshot => {
        const snapshotValue = snapshot.val();
        if (snapshotValue !== null) {
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [snapshotValue]),
          );
        }
      });
  }, [botUser.name]);

  const onSend = (newMessages: IMessage[]) => {
    const parsedMsg = {...newMessages[0], _id: messages.length + 1};
    database().ref(`/chat/${botUser.name}`).push(parsedMsg);
    const message = parsedMsg.text;
    Dialogflow_V2.requestQuery(
      message,
      response => handleDialogflowResponse(response as chat.dialogFlowResponse),
      error => console.log(error),
    );
  };

  const handleDialogflowResponse = (response: chat.dialogFlowResponse) => {
    const textResponse =
      response.queryResult.fulfillmentMessages[0].text.text[0];
    const msg = {
      _id: messages.length + 2,
      text: textResponse,
      createdAt: new Date(),
      user: botUser,
    };
    database().ref(`/chat/${botUser.name}`).push(msg);
  };

  const renderCustomDay = (props: DayProps<IMessage>) => {
    return (
      <Day
        {...props}
        wrapperStyle={styles.dateWrapper}
        textStyle={styles.dateText}
      />
    );
  };

  const renderCustomBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
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

  const renderCustomTime = (props: TimeProps<IMessage>) => {
    return (
      <Time
        {...props}
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

  const renderCustomInputToolbar = (props: InputToolbarProps) => {
    return (
      <InputToolbar {...props} containerStyle={styles.textInputContainer} />
    );
  };

  return (
    <ImageBackground source={Assets.chatBg} style={styles.chatBg}>
      <Appbar.Header>
        <Appbar.Action icon="dots-vertical" />
        <Appbar.Content title={botUser.name} />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: 1,
          name: 'yaaaa',
        }}
        renderDay={renderCustomDay}
        renderBubble={renderCustomBubble}
        renderTime={renderCustomTime}
        renderInputToolbar={renderCustomInputToolbar}
        placeholder="Type a message"
      />
    </ImageBackground>
  );
};

export default ChatScreen;

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
});
