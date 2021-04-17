import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
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
import Assets from '../../../helpers/Assets';

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const botName = 'FAQ Bot';

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text:
          'Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: botName,
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

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
        <Appbar.Content title={botName} />
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
