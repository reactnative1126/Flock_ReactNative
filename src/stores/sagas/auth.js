import { put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import types from '@stores/types';
import { apiSignIn, apiSignUp, apiSignOut } from '@apis/auth';
import { athenaAction, authAction } from '@stores/actions';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

function* signInSaga({ navigation, payload }) {
  try {
    yield put(athenaAction.loading(true));
    let result = yield auth().signInWithEmailAndPassword(payload.email, payload.password);
    if (result?.user.uid) {
      let response = yield apiSignIn({
        uid: result?.user.uid,
        // token: result?.user.refreshToken,
      });
      if (response.data) {
        yield put(authAction.signInSuccess(navigation, response.data?.data[0]));
      } else {
        yield put(authAction.signInFailure(response.error));
      }
    }
  } catch (error) {
    if (error.code === 'auth/internal-error') {
      Toast.show({ type: 'error', text1: 'Error', text2: 'That email or password is invalid!' });
    } else {
      yield put(authAction.signInFailure(error));
    }
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* signInSuccessSaga({ navigation, payload }) {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Main' }]
  });
};

function* signUpSaga({ navigation, payload }) {
  try {
    yield put(athenaAction.loading(true));
    let result = yield auth().createUserWithEmailAndPassword(payload.email, payload.password);
    if (result?.user.uid) {
      let response = yield apiSignUp({
        uid: result?.user.uid,
        // token: result?.user.refreshToken,
        email: result?.user.email,
        fullname: payload.fullname
      });
      if (response.data) {
        yield put(authAction.signUpSuccess(navigation, response.data?.data[0]));
      } else {
        yield put(authAction.signUpFailure(response.error));
      }
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Toast.show({ type: 'error', text1: 'Error', text2: 'That email address is already in use!' });
    } else if (error.code === 'auth/invalid-email') {
      Toast.show({ type: 'error', text1: 'Error', text2: 'That email address is invalid!' });
    } else {
      yield put(authAction.signUpFailure(error));
    }
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* signUpSuccessSaga({ navigation, payload }) {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Main' }]
  });
};

function* signOutSaga({ navigation }) {
  try {
    yield put(athenaAction.loading(true));
    // let result = yield auth().signOut();
    yield put(authAction.signOutSuccess(navigation));
  } catch (error) {
    yield put(authAction.signOutFailure(error));
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* signOutSuccessSaga({ navigation }) {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Auth' }]
  });
};

function* authSaga() {
  yield all([takeEvery(types.SIGN_IN, signInSaga)]);
  yield all([takeEvery(types.SIGN_IN_SUCCESS, signInSuccessSaga)]);
  yield all([takeEvery(types.SIGN_UP, signUpSaga)]);
  yield all([takeEvery(types.SIGN_UP_SUCCESS, signUpSuccessSaga)]);
  yield all([takeEvery(types.SIGN_OUT, signOutSaga)]);
  yield all([takeEvery(types.SIGN_OUT_SUCCESS, signOutSuccessSaga)]);
};

export default authSaga;