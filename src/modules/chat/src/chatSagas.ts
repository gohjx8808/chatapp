import database from '@react-native-firebase/database';
import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {userDetailsSelector} from '../../login/src/loginSelectors';
import {chatActionCreators, chatActions} from './chatActions';
import {selectedFrenSelector} from './chatSelectors';

export default function* chatRuntime() {
  yield fork(getFrenListSaga);
  yield fork(storeChatMessagesSaga);
}

function getChatList(userID: string) {
  const chatDatabaseRef = `/chat/${userID}`;
  return eventChannel(emitter => {
    database()
      .ref(chatDatabaseRef)
      .on('child_added', chatSnapshot => {
        const receiverUserID = chatSnapshot.key;
        const userDatabaseRef = `/users/${receiverUserID}`;
        database()
          .ref(userDatabaseRef)
          .once('value', (userSnapshot: any) => {
            const frenData = {
              uid: receiverUserID,
              name: userSnapshot.val().name,
              photoURL: userSnapshot.val().photoURL,
            };
            emitter(frenData);
          });
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

function getChatMessages(databaseRef: string) {
  return eventChannel(emitter => {
    database()
      .ref(databaseRef)
      .limitToLast(20)
      .on('value', snapshots => {
        snapshots.forEach(snapshot => {
          const snapshotValue = snapshot.val();
          emitter(snapshotValue);
          return undefined;
        });
        emitter(END);
      });
    return () => {};
  });
}

function* storeChatMessagesSaga() {
  while (true) {
    yield take(chatActions.GET_CHAT_MESSAGES);
    yield call(storeChatMessagesListener);
  }
}

function* storeChatMessagesListener() {
  const selectedFren: chat.frenData = yield select(selectedFrenSelector);
  const currentUser: login.userData = yield select(userDetailsSelector);
  const databaseRef = `/chat/${currentUser.uid}/${selectedFren.uid}`;
  const getChatMessagesAction: EventChannel<chat.IMessage> = yield call(
    getChatMessages,
    databaseRef,
  );
  const msgList = [] as chat.IMessage[];
  try {
    while (true) {
      const response: chat.IMessage = yield take(getChatMessagesAction);
      msgList.unshift(response);
    }
  } finally {
    yield put(chatActionCreators.storeMessages(msgList));
  }
}
