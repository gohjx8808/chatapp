import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {userDetailsSelector} from '../../login/src/loginSelectors';

const ChatListScreen = (props: PropsFromRedux) => {
  const {userDetails} = props;
  const [frenList, setFrenList] = useState<string[]>([
    'FAQ Bot',
    'I2XN9zp8svZHZymeTFGJ8IuQrqr2',
  ]);

  const databaseRef = `/chat/${userDetails.uid}`;
  // useEffect(() => {
  //   database()
  //     .ref(databaseRef)
  //     .on('child_added', snapshot => {
  //       const snapshotValue: string = snapshot.key!;
  //       setFrenList(prevFren => [...prevFren, snapshotValue]);
  //     });
  // }, [databaseRef]);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="ChatApp" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      {frenList.map((fren, index) => {
        return <List.Item title={fren} style={styles.chatList} key={index} />;
      })}
    </ScrollView>
  );
};

const connector = connect((state: GlobalState) => ({
  userDetails: userDetailsSelector(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChatListScreen);

const styles = StyleSheet.create({
  chatList: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderBottomWidth: 0.2,
  },
});
