import database from '@react-native-firebase/database';
import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {getFrenList} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {chatActionCreators, chatActions} from './chatActions';
import {selectedFrenSelector} from './chatSelectors';

export default function* chatRuntime() {
  yield fork(getChatFrenListSaga);
  yield fork(storeChatMessagesSaga);
}

function* getChatFrenListSaga() {
  yield take(chatActions.GET_CHAT_FREN_LIST);
  const currentUser: login.currentUserData = yield select(currentUserSelector);
  const userID = currentUser.uid;
  const chatSnapshotResponse: EventChannel<string> = yield call(
    getFrenList,
    userID,
    'chat',
  );
  while (true) {
    const fren: frenData = yield take(chatSnapshotResponse);
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
  const selectedFren: frenData = yield select(selectedFrenSelector);
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
