import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Avatar, List, Searchbar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
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

  useEffect(() => {
    getChatFrenList();
  }, [getChatFrenList]);

  const renderChatFriend = ({item}: {item: frenDetails}) => {
    console.log(item);
    if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return (
        <List.Item
          title={item.name}
          style={styles.chatList}
          key={item.uid}
          onPress={() => {
            loadSelectedFren(item);
            getChatMessages();
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
      <FlatList
        data={chatFrenList}
        renderItem={renderChatFriend}
        keyExtractor={item => item.uid}
      />
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
});
