import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Appbar,
  Avatar,
  Button,
  List,
  Searchbar,
  Text,
  useTheme,
} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import assets from '../../../helpers/assets';
import {defaultChatMsgLength} from '../../../helpers/firebaseUtils';
import GlobalStyles from '../../../helpers/globalStyles';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import routeNames from '../../navigation/src/routeNames';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';
import {chatFrenListSelector} from '../src/chatSelectors';

const ChatListScreen = (props: PropsFromRedux) => {
  const {
    loadSelectedFren,
    getChatMessages,
    getChatFrenList,
    chatFrenList,
  } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const {colors} = useTheme();

  useEffect(() => {
    getChatFrenList();
  }, [getChatFrenList]);

  const renderChatFriend = ({item}: {item: frenDetails}) => {
    if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return (
        <List.Item
          title={item.name}
          style={styles.chatList}
          key={item.uid}
          onPress={() => {
            loadSelectedFren(item);
            getChatMessages(defaultChatMsgLength);
            navigate(chatRouteNames.CHAT);
          }}
          left={iconProps => (
            <Avatar.Image
              {...iconProps}
              source={{
                uri: item.photoURL,
              }}
              size={36}
            />
          )}
        />
      );
    }
    return <View />;
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Messages" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={GlobalStyles.fullWidthSearchBar}
      />
      {chatFrenList.length > 0 ? (
        <FlatList
          data={chatFrenList}
          renderItem={renderChatFriend}
          keyExtractor={item => item.uid}
        />
      ) : (
        <View style={GlobalStyles.centerEverything}>
          <View style={GlobalStyles.notFoundContainer}>
            <FastImage
              source={assets.notFound}
              style={[GlobalStyles.image, GlobalStyles.notFoundImage]}
            />
          </View>
          <Text style={styles.verticalSpace}>
            Oops. We couldn't find any ongoing chat.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigate(routeNames.FRIEND)}
            style={styles.newChat}
            color={colors.primary}>
            New Chat
          </Button>
        </View>
      )}
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    chatFrenList: chatFrenListSelector(state),
  }),
  {
    loadSelectedFren: chatActionCreators.loadSelectedFren,
    getChatMessages: chatActionCreators.getChatMessages,
    getChatFrenList: chatActionCreators.getChatFrenList,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChatListScreen);

const styles = StyleSheet.create({
  chatList: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderBottomWidth: 0.2,
  },
  verticalSpace: {
    marginVertical: '5%',
  },
  newChat: {
    width: '40%',
  },
});
