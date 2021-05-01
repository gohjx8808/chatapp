import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Avatar, List} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';
import {frenListSelector} from '../src/chatSelectors';
import AddFrensModal from './AddFrensModal';

const ChatListScreen = (props: PropsFromRedux) => {
  const {
    frenList,
    loadSelectedFren,
    getFrenList,
    getChatMessages,
    toggleAddFrenModal,
  } = props;

  useEffect(() => {
    getFrenList();
  }, [getFrenList]);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Messages" />
        <Appbar.Action
          icon="account-plus"
          onPress={() => toggleAddFrenModal(true)}
        />
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
                  uri: fren.photoURL,
                }}
                size={36}
              />
            )}
          />
        );
      })}
      <AddFrensModal />
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
    toggleAddFrenModal: chatActionCreators.toggleAddFrenModal,
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
