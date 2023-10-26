import { fork, all } from 'redux-saga/effects';
import authSaga from './auth';
import mainSaga from './main';

function* sagas() {
  yield all([
    fork(authSaga),
    fork(mainSaga),
  ])
};

export default sagas;