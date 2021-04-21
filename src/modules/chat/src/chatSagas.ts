import database from '@react-native-firebase/database';
import {EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {userDetailsSelector} from '../../login/src/loginSelectors';
import {chatActionCreators, chatActions} from './chatActions';

export default function* chatRuntime() {
  yield fork(getFrenListSaga);
}

function getChatList(userID: string) {
  const chatDatabaseRef = `/chat/${userID}`;
  return eventChannel(emitter => {
    database()
      .ref(chatDatabaseRef)
      .on('child_added', chatSnapshot => {
        const receiverUserID = chatSnapshot.key;
        if (receiverUserID !== 'FAQ Bot') {
          const userDatabaseRef = `/users/${receiverUserID}`;
          database()
            .ref(userDatabaseRef)
            .once('value', (userSnapshot: any) => {
              const frenData = {
                uid: receiverUserID,
                name: userSnapshot.val().name,
              };
              emitter(frenData);
            });
        } else {
          const frenData = {uid: receiverUserID, name: receiverUserID};
          emitter(frenData);
        }
      });
    return () => {
      console.log('unsubscribe');
    };
  });
}

function* getFrenListSaga() {
  yield take(chatActions.GET_FREN_LIST);
  const currentUser: login.userData = yield select(userDetailsSelector);
  const userID = currentUser.uid!;
  const chatSnapshotResponse: EventChannel<string> = yield call(
    getChatList,
    userID,
  );
  while (true) {
    const fren: chat.frenData = yield take(chatSnapshotResponse);
    yield put(chatActionCreators.loadFrenList(fren));
  }
}
