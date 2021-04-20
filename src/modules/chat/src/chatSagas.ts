import database from '@react-native-firebase/database';
import {Channel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {userDetailsSelector} from '../../login/src/loginSelectors';
import {chatActionCreators, chatActions} from './chatActions';

export default function* chatRuntime() {
  yield fork(getFrenListSaga);
}

function getChatList(chatDatabaseRef: string) {
  return eventChannel(emitter => {
    database()
      .ref(chatDatabaseRef)
      .on('child_added', chatSnapshot => emitter(chatSnapshot.key));
    return () => {};
  });
}

function getUserInfo(chatUserID: string) {
  const userDatabaseRef = `/chat/${chatUserID}`;
  return eventChannel(emitter => {
    database()
      .ref(userDatabaseRef)
      .on('value', (userSnapshot: any) => {
        const frenData = {uid: chatUserID, name: userSnapshot.name};
        emitter(frenData);
      });
    return () => {};
  });
}

function* getFrenListSaga() {
  while (true) {
    yield take(chatActions.GET_FREN_LIST);
    const currentUser: login.userData = yield select(userDetailsSelector);
    const chatDatabaseRef = `/chat/${currentUser.uid}`;
    const chatSnapshotResponse: Channel<string> = yield call(
      getChatList,
      chatDatabaseRef,
    );
    const chatUserID: string = yield take(chatSnapshotResponse);
    console.log(chatUserID);
    if (chatUserID !== 'FAQ Bot') {
      const userSnapshotResponse: Channel<string> = yield call(
        getUserInfo,
        chatUserID,
      );
      const userInfo: chat.frenData = yield take(userSnapshotResponse);
      console.log(userInfo);
      yield put(
        chatActionCreators.loadFrenList({
          uid: userInfo.uid,
          name: userInfo.name,
        }),
      );
    } else {
      yield put(
        chatActionCreators.loadFrenList({uid: 'FAQ Bot', name: 'FAQ Bot'}),
      );
    }
  }
}
