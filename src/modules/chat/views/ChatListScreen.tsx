import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Avatar, List} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import assets from '../../../helpers/assets';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';
import {frenListSelector} from '../src/chatSelectors';

const ChatListScreen = (props: PropsFromRedux) => {
  const {frenList, loadSelectedFren, getFrenList, getChatMessages} = props;

  useEffect(() => {
    getFrenList();
  }, [getFrenList]);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Messages" />
        <Appbar.Action icon="plus-circle-outline" />
      </Appbar.Header>
      {frenList.map((fren, index) => {
        return (
          <List.Item
            title={fren.name}
            style={styles.chatList}
            key={index}
            onPress={() => {
              loadSelectedFren(fren);
              getChatMessages();
              navigate(chatRouteNames.CHAT);
            }}
            left={iconProps => (
              <Avatar.Image
                {...iconProps}
                source={{
                  uri:
                    fren.photoURL === '' ? assets.defaultUser : fren.photoURL,
                }}
                size={36}
              />
            )}
          />
        );
      })}
    </ScrollView>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    frenList: frenListSelector(state),
  }),
  {
    getFrenList: chatActionCreators.getFrenList,
    loadSelectedFren: chatActionCreators.loadSelectedFren,
    getChatMessages: chatActionCreators.getChatMessages,
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
