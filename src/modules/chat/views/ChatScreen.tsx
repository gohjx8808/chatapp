import database from '@react-native-firebase/database';
import React, {useEffect} from 'react';
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
import {connect, ConnectedProps} from 'react-redux';
import Assets from '../../../helpers/assets';
import {
  dialogFlowClientEmail,
  dialogFlowPrivateKey,
  dialogFlowProjectID,
} from '../../../helpers/constants';
import {userDetailsSelector} from '../../login/src/loginSelectors';
import {chatActionCreators} from '../src/chatActions';
import {messagesSelector} from '../src/chatSelectors';

const ChatScreen = (props: PropsFromRedux) => {
  const {storeMessages, messages, userDetails} = props;
  const botUser = {
    _id: 2,
    name: 'FAQ Bot',
    avatar: 'https://placeimg.com/140/140/any',
  };

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
          storeMessages(snapshotValue);
        }
      });
  }, [botUser.name, storeMessages]);

  const onSend = (newMessages: IMessage[]) => {
    const parsedMsg = newMessages[0];
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
      _id: messages.length + 1,
      text: textResponse,
      createdAt: new Date(),
      user: botUser,
    };
    database().ref(`/chat/${botUser.name}`).push(msg);
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

  const renderCustomInputToolbar = (toolbarProps: InputToolbarProps) => {
    return (
      <InputToolbar
        {...toolbarProps}
        containerStyle={styles.textInputContainer}
      />
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
          _id: !userDetails.uid ? '' : userDetails.uid,
          name: !userDetails.display_name ? '' : userDetails.display_name,
          avatar: !userDetails.photoURL ? '' : userDetails.photoURL,
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

const connector = connect(
  (state: GlobalState) => ({
    messages: messagesSelector(state),
    userDetails: userDetailsSelector(state),
  }),
  {
    storeMessages: chatActionCreators.storeMessages,
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
});
