import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {Task} from '@redux-saga/core';
import {
  call,
  cancel,
  fork,
  put,
  race,
  select,
  take,
} from '@redux-saga/core/effects';
import {IMessage} from 'react-native-gifted-chat';
import {Image} from 'react-native-image-crop-picker';
import assets from '../../../helpers/assets';
import {
  defaultChatMsgLength,
  deleteFriend,
  getChatFrenList,
  getChatMessages,
  getFrenDetail,
  getUploadedPhotoUrl,
  postUploadProfilePhoto,
} from '../../../helpers/firebaseUtils';
import {friendActionCreators} from '../../friend/src/friendActions';
import {
  imagePickerActionCreators,
  imagePickerActions,
} from '../../imagePicker/src/imagePickerActions';
import {
  originScreenSelector,
  uploadedPhotoSelector,
} from '../../imagePicker/src/imagePickerSelectors';
import {loadingOverlayActionCreators} from '../../loadingOverlay/src/loadingOverlayActions';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {goBack, navigate} from '../../navigation/src/navigationUtils';
import routeNames from '../../navigation/src/routeNames';
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

function* storeChatMessagesSaga() {
  while (true) {
    const {payload}: chatActionTypes.getChatMessagesActionType = yield take(
      chatActions.GET_CHAT_MESSAGES,
    );
    yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
    const selectedFren: frenDetails = yield select(selectedFrenSelector);
    const currentUser: login.currentUserData = yield select(
      currentUserSelector,
    );
    const databaseRef = `/chat/${currentUser.uid}/${selectedFren.uid}`;
    try {
      const chatResponse: FirebaseDatabaseTypes.DataSnapshot = yield call(
        getChatMessages,
        databaseRef,
        payload,
      );
      const msgList = [] as chat.IMessage[];
      chatResponse.forEach(snapshot => {
        const snapshotValue = snapshot.val();
        msgList.unshift(snapshotValue);
        return undefined;
      });
      yield put(chatActionCreators.storeMessages(msgList));
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
    } catch (error) {
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      navigate(routeNames.LOGIN);
    }
  }
}

function* getChatFrenListSaga() {
  while (true) {
    yield take(chatActions.GET_CHAT_FREN_LIST);
    yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
    const currentUser: login.currentUserData = yield select(
      currentUserSelector,
    );
    const targetDatabaseRef = `/chat/${currentUser.uid}`;
    try {
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
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
    } catch (error) {
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      navigate(routeNames.LOGIN);
    }
  }
}

function* deleteFriendSaga() {
  while (true) {
    const {payload}: chatActionTypes.deleteFriendActionType = yield take(
      chatActions.DELETE_FRIEND,
    );
    yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
    const currentUser: login.currentUserData = yield select(
      currentUserSelector,
    );
    yield put(statusActionCreators.updateStatusTitle('Delete Friend'));
    try {
      yield call(deleteFriend, currentUser.uid, payload);
      yield put(chatActionCreators.getChatFrenList());
      yield put(friendActionCreators.getFriendList());
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your friend had been successfully removed',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      yield put(chatActionCreators.toggleDeleteFriendConfirmModal(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      navigate(chatRouteNames.CHAT_LIST);
    } catch (error) {
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your friend had failed to remove',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      yield put(statusActionCreators.toggleStatusModal(true));
    }
  }
}

function* sendImageSaga() {
  while (true) {
    const {selectChatImage, selectedImage, cancelImagePicker} = yield race({
      selectChatImage: take(chatActions.SELECT_CHAT_IMAGE),
      selectedImage: take(imagePickerActions.UPDATE_UPLOADED_PHOTO),
      cancelImagePicker: take(imagePickerActions.CANCEL_IMAGE_PICKER),
    });
    if (selectChatImage) {
      yield put(
        imagePickerActionCreators.updateImagePickerDialogTitle('Select Image'),
      );
      yield put(imagePickerActionCreators.updateOriginScreen('chat'));
      yield put(imagePickerActionCreators.toggleIsCropping(false));
      yield put(imagePickerActionCreators.toggleImagePickerDialog(true));
    } else if (selectedImage) {
      const imagePickerOriginScreen: string = yield select(
        originScreenSelector,
      );
      if (imagePickerOriginScreen === 'chat') {
        navigate(chatRouteNames.PENDING_IMAGE);
        yield put(imagePickerActionCreators.toggleImagePickerDialog(false));
        const uploadPictureToChatFirebase: Task = yield fork(
          uploadPictureToFirebaseSaga,
        );
        yield take(chatActions.ON_PENDING_IMAGE_UNMOUNT);
        yield cancel(uploadPictureToChatFirebase);
      }
    } else if (cancelImagePicker) {
    }
  }
}

function* uploadPictureToFirebaseSaga() {
  const {payload}: chatActionTypes.sendImageMsgActionType = yield take(
    chatActions.SEND_IMAGE_MSG,
  );
  yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
  const uploadedPhoto: Image = yield select(uploadedPhotoSelector);
  const snapshot: FirebaseStorageTypes.TaskSnapshot = yield call(
    postUploadProfilePhoto,
    uploadedPhoto,
  );
  const sentImageURL: string = yield call(
    getUploadedPhotoUrl,
    snapshot.metadata.name,
  );
  const currentUser: login.currentUserData = yield select(currentUserSelector);
  const selectedFren: frenDetails = yield select(selectedFrenSelector);
  const databaseRef = `/chat/${currentUser.uid}/${selectedFren.uid}`;
  const processedCurrentUser = {
    name: currentUser.name,
    avatar: currentUser.photoURL,
    _id: currentUser.uid,
  };
  const msg: IMessage = {
    _id: new Date().toISOString(),
    image: sentImageURL,
    text: payload,
    createdAt: new Date(),
    user: processedCurrentUser,
  };
  database().ref(databaseRef).push(msg);
  yield put(chatActionCreators.getChatMessages(defaultChatMsgLength));
  yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
  goBack();
}
