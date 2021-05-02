import database from '@react-native-firebase/database';
import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import assets from '../../../helpers/assets';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {chatActionCreators, chatActions} from './chatActions';
import {selectedFrenSelector} from './chatSelectors';
import storage from '@react-native-firebase/storage';

export default function* chatRuntime() {
  yield fork(getChatFrenListSaga);
  yield fork(storeChatMessagesSaga);
}

function getChatList(userID: string) {
  const chatDatabaseRef = `/chat/${userID}`;
  return eventChannel(emitter => {
    database()
      .ref(chatDatabaseRef)
      .on('value', chatSnapshots => {
        chatSnapshots.forEach(chatSnapshot => {
          const receiverID = chatSnapshot.key;
          const userDatabaseRef = `/users/${receiverID}`;
          database()
            .ref(userDatabaseRef)
            .once('value', (userSnapshot: any) => {
              if (userSnapshot.val().photoName === '') {
                const chatFrenData = {
                  uid: receiverID,
                  name: userSnapshot.val().name,
                  photoURL: assets.defaultUser,
                };
                emitter(chatFrenData);
              } else {
                storage()
                  .ref(`/${userSnapshot.val().photoName}`)
                  .getDownloadURL()
                  .then(photoURL => {
                    const chatFrenData = {
                      uid: receiverID,
                      name: userSnapshot.val().name,
                      photoURL: photoURL,
                    };
                    emitter(chatFrenData);
                  });
              }
            });
          return undefined;
        });
      });
    return () => {};
  });
}

function* getChatFrenListSaga() {
  yield take(chatActions.GET_CHAT_FREN_LIST);
  const currentUser: login.currentUserData = yield select(currentUserSelector);
  const userID = currentUser.uid;
  const chatSnapshotResponse: EventChannel<string> = yield call(
    getChatList,
    userID,
  );
  while (true) {
    const fren: chat.chatFrenData = yield take(chatSnapshotResponse);
    yield put(chatActionCreators.loadChatFrenList(fren));
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
  const selectedFren: chat.chatFrenData = yield select(selectedFrenSelector);
  const currentUser: login.currentUserData = yield select(currentUserSelector);
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
