import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Avatar, List} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import assets from '../../../helpers/assets';
import {chatActionCreators} from '../src/chatActions';
import {frenListSelector} from '../src/chatSelectors';

const ChatListScreen = (props: PropsFromRedux) => {
  const {frenList, loadSelectedFren, getFrenList} = props;

  useEffect(() => {
    getFrenList();
  }, [getFrenList]);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="ChatApp" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      {frenList.map((fren, index) => {
        return (
          <List.Item
            title={fren.name}
            style={styles.chatList}
            key={index}
            onPress={() => loadSelectedFren(fren.uid)}
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
