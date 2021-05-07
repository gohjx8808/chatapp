import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import assets from '../../../helpers/assets';
import {
  getChatFrenList,
  getFrenDetail,
  getUploadedPhotoUrl,
  postSubmitAddFriend,
} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  friendActionCreators,
  friendActions,
  friendActionTypes,
} from './friendActions';

export default function* friendRuntime() {
  yield fork(submitAddFriendSaga);
  yield fork(getFrenListSaga);
}

function checkUserAvailability(frenID: string) {
  return eventChannel(emitter => {
    database()
      .ref('users')
      .on('value', snapshots => {
        let flag = false;
        snapshots.forEach(snapshot => {
          if (snapshot.key === frenID) {
            flag = true;
          }
          return undefined;
        });
        emitter(flag);
        emitter(END);
      });
    return () => {};
  });
}

function* checkUserAvailabilitySaga(frenID: string) {
  const checkUserAvailabilityAction: EventChannel<boolean> = yield call(
    checkUserAvailability,
    frenID,
  );
  while (true) {
    const isAvailable: boolean = yield take(checkUserAvailabilityAction);
    return isAvailable;
  }
}

function* submitAddFriendSaga() {
  while (true) {
    const {payload}: friendActionTypes.submitAddFriendActionType = yield take(
      friendActions.SUBMIT_ADD_FRIEND,
    );
    yield put(friendActionCreators.toggleFriendLoading(true));
    yield put(statusActionCreators.updateStatusTitle('Add Friend'));
    try {
      const currentUser: login.currentUserData = yield select(
        currentUserSelector,
      );
      const response: boolean = yield call(checkUserAvailabilitySaga, payload);
      if (response) {
        yield call(postSubmitAddFriend, currentUser.uid, payload);
        yield put(statusActionCreators.toggleApiStatus(true));
        yield put(
          statusActionCreators.updateStatusMsg(
            'Your friend is successfully added!',
          ),
        );
      } else {
        yield put(statusActionCreators.toggleApiStatus(false));
        yield put(statusActionCreators.updateStatusMsg('User not exists!'));
      }
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(friendActionCreators.toggleFriendLoading(false));
    } catch (error) {
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(
        statusActionCreators.updateStatusMsg('Your friend had failed to add!'),
      );
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(friendActionCreators.toggleFriendLoading(false));
    }
  }
}

function* getFrenListSaga() {
  while (true) {
    yield take(friendActions.GET_FRIEND_LIST);
    const currentUser: login.currentUserData = yield select(
      currentUserSelector,
    );
    const targetDatabaseRef = `/users/${currentUser.uid}/friends`;
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
    yield put(friendActionCreators.loadFriendList(frenDataList));
  }
}
