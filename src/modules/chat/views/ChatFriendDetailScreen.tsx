import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {goBack} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import {selectedFrenSelector} from '../src/chatSelectors';
import DeleteFriendConfirmModal from './DeleteFriendConfirmModal';

const ChatFriendDetailScreen = (props: PropsFromRedux) => {
  const {selectedFren, toggleDeleteFriendConfirmModal} = props;

  const {colors} = useTheme();

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={GlobalStyles.centerEverything}>
        <TouchableOpacity
          style={GlobalStyles.centerEverything}
          onPress={() => {}}>
          <Avatar.Image
            source={{uri: selectedFren.photoURL}}
            style={styles.iconTopSpace}
            size={80}
          />
          <Title style={styles.nameTitle}>{selectedFren.name}</Title>
        </TouchableOpacity>
        <View style={styles.details}>
          <View style={styles.detailsTopSpace}>
            <Text style={GlobalStyles.boldText}>Gender</Text>
            <Text>{selectedFren.gender ? selectedFren.gender : 'N/A'}</Text>
          </View>
          <View style={styles.detailsTopSpace}>
            <Text style={GlobalStyles.boldText}>Date of Birth</Text>
            <Text>{selectedFren.dob ? selectedFren.dob : 'N/A'}</Text>
          </View>
          <View style={styles.detailsTopSpace}>
            <Text style={GlobalStyles.boldText}>Email</Text>
            <Text>{selectedFren.email ? selectedFren.email : 'N/A'}</Text>
          </View>
        </View>
        <Button
          mode="outlined"
          theme={{colors: {primary: colors.danger}}}
          style={{borderColor: colors.danger}}
          onPress={() => toggleDeleteFriendConfirmModal(true)}>
          Unfriend
        </Button>
      </ScrollView>
      <DeleteFriendConfirmModal />
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    selectedFren: selectedFrenSelector(state),
  }),
  {
    toggleDeleteFriendConfirmModal:
      chatActionCreators.toggleDeleteFriendConfirmModal,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChatFriendDetailScreen);

const styles = StyleSheet.create({
  iconTopSpace: {
    marginTop: '10%',
  },
  details: {
    width: '90%',
    marginTop: '5%',
    paddingBottom: '15%',
    paddingHorizontal: '5%',
  },
  nameTitle: {
    paddingTop: '3%',
  },
  detailsTopSpace: {
    marginTop: '5%',
  },
});
