import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import assets from '../../../helpers/assets';
import {
  getChatFrenList,
  getFrenDetail,
  getUploadedPhotoUrl,
} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {chatActionCreators, chatActions} from './chatActions';
import {selectedFrenSelector} from './chatSelectors';

export default function* chatRuntime() {
  yield fork(storeChatMessagesSaga);
  yield fork(getChatFrenListSaga);
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
  const selectedFren: frenDetails = yield select(selectedFrenSelector);
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

function* getChatFrenListSaga() {
  while (true) {
    yield take(chatActions.GET_CHAT_FREN_LIST);
    const currentUser: login.currentUserData = yield select(
      currentUserSelector,
    );
    const frenSnapshots: FirebaseDatabaseTypes.DataSnapshot = yield call(
      getChatFrenList,
      currentUser.uid,
    );
    let frenIDList = [] as string[];
    frenSnapshots.forEach(frenSnapshot => {
      frenIDList.push(frenSnapshot.key!);
      return undefined;
    });
    let frenDataList = [] as frenDetails[];
    for (let i = 0; i < frenIDList.length; i++) {
      const frenDataSnapshot: FirebaseDatabaseTypes.DataSnapshot = yield call(
        getFrenDetail,
        frenIDList[i],
      );
      let frenDatas = frenDataSnapshot.val();
      if (frenDatas.photoName !== '') {
        const derivedURL: string = yield call(
          getUploadedPhotoUrl,
          frenDatas.photoName,
        );
        frenDatas.photoURL = derivedURL;
      } else {
        frenDatas.photoURL = assets.defaultUser;
      }
      frenDatas = {
        ...frenDatas,
        name: frenDatas.name,
        uid: frenIDList[i],
      };
      frenDataList.push(frenDatas);
    }
    yield put(chatActionCreators.loadChatFrenList(frenDataList));
  }
}
