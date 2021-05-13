import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, race, select, take} from '@redux-saga/core/effects';
import assets from '../../../helpers/assets';
import {
  deleteFriend,
  getChatFrenList,
  getFrenDetail,
  getUploadedPhotoUrl,
} from '../../../helpers/firebaseUtils';
import {friendActionCreators} from '../../friend/src/friendActions';
import {
  imagePickerActionCreators,
  imagePickerActions,
} from '../../imagePicker/src/imagePickerActions';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {navigate} from '../../navigation/src/navigationUtils';
import {statusActionCreators} from '../../status/src/statusActions';
import {chatActionCreators, chatActions, chatActionTypes} from './chatActions';
import chatRouteNames from './chatRouteNames';
import {selectedFrenSelector} from './chatSelectors';

export default function* chatRuntime() {
  yield fork(storeChatMessagesSaga);
  yield fork(getChatFrenListSaga);
  yield fork(deleteFriendSaga);
  yield fork(sendImageSaga);
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
    const targetDatabaseRef = `/chat/${currentUser.uid}`;
    const frenSnapshots: FirebaseDatabaseTypes.DataSnapshot = yield call(
      getChatFrenList,
      targetDatabaseRef,
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

function* deleteFriendSaga() {
  while (true) {
    const {payload}: chatActionTypes.deleteFriendActionType = yield take(
      chatActions.DELETE_FRIEND,
    );
    yield put(chatActionCreators.toggleChatLoading(true));
    const currentUser: login.currentUserData = yield select(
      currentUserSelector,
    );
    yield put(statusActionCreators.updateStatusTitle('Delete Friend'));
    try {
      yield call(deleteFriend, currentUser.uid, payload);
      yield put(chatActionCreators.getChatFrenList());
      yield put(friendActionCreators.getFriendList());
      yield put(chatActionCreators.toggleChatLoading(false));
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your friend had been successfully removed',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(chatActionCreators.toggleDeleteFriendConfirmModal(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      navigate(chatRouteNames.CHAT_LIST);
    } catch (error) {
      yield put(chatActionCreators.toggleChatLoading(false));
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your friend had failed to remove',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
    }
  }
}

function* sendImageSaga() {
  while (true) {
    yield take(chatActions.SEND_IMAGE);
    yield put(imagePickerActionCreators.toggleImagePickerDialog(true));
    const {selectedImage, cancelImagePicker, dismissDialog} = yield race({
      selectedImage: take(imagePickerActions.UPDATE_UPLOADED_PHOTO_NAME),
      cancelImagePicker: take(imagePickerActions.CANCEL_IMAGE_PICKER),
      dismissDialog: take(imagePickerActions.TOGGLE_IMAGE_PICKER_DIALOG),
    });
    if (selectedImage) {
      yield call(uploadPictureToFirebaseSaga, selectedImage.payload);
    } else if (cancelImagePicker) {
    } else if (dismissDialog) {
    }
  }
}

function* uploadPictureToFirebaseSaga(imageName: string) {
  const sentImageURL: string = yield call(getUploadedPhotoUrl, imageName);
  const currentUser: login.currentUserData = yield select(currentUserSelector);
  const selectedFren: frenDetails = yield select(selectedFrenSelector);
  const databaseRef = `/chat/${currentUser.uid}/${selectedFren.uid}`;
  const processedCurrentUser = {
    name: currentUser.name,
    avatar: currentUser.photoURL,
    _id: currentUser.uid,
  };
  const msg = {
    _id: new Date().toISOString(),
    image: sentImageURL,
    createdAt: new Date(),
    user: processedCurrentUser,
  };
  database().ref(databaseRef).push(msg);
  yield put(chatActionCreators.getChatMessages());
}
