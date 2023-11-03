import { put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import types from '@stores/types';
import Toast from 'react-native-toast-message';
import { apiSetLocation, apiSetFeel, apiGetLocations, apiGetAnalytics, apiGetCharts } from '@apis/main';
import { athenaAction, authAction, mainAction } from '@stores/actions';

function* setLocationSaga({ navigation, payload }) {
  try {
    yield put(athenaAction.loading(true));
    let response = yield apiSetLocation({
      uid: payload.uid,
      latitude: payload.latitude,
      longitude: payload.longitude,
      region: payload.region
    });
    // if (response.data) {
    //   yield put(authAction.updateUserInfo(response.data?.data[0]));
    // }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'Update location failed!' });
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* setFeelSaga({ navigation, payload }) {
  try {
    yield put(athenaAction.loading(true));
    let response = yield apiSetFeel({
      uid: payload.uid,
      type: payload.type,
      status: payload.status,
      startDate: payload.startDate,
      endDate: payload.endDate
    });
    if (response.data) {
      yield put(authAction.updateFeelData({ [payload.type]: payload.status }));
      navigation.navigate('Home', { feeling_type: payload.type, feeling_value: payload.status });
    }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'Update feel status failed!' });
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* getLocationsSaga({ navigation, payload }) {
  try {
    yield put(athenaAction.loading(true));
    let response = yield apiGetLocations({
      feeling_type: payload.feeling_type,
      feeling_value: payload.feeling_value,
      startDate: payload.startDate,
      endDate: payload.endDate
    });
    if (response.data) {
      yield put(mainAction.updateLocations(response.data?.data))
    }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'Get locations failed!' });
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* getAnalyticsSaga({ navigation, payload }) {
  try {
    yield put(athenaAction.loading(true));
    let response = yield apiGetAnalytics({
      startDate: payload.startDate,
      endDate: payload.endDate,
      region: payload.region
    });
    if (response.data) {
      yield put(mainAction.setAnalytics(response.data?.data))
    }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'Get analytics failed!' });
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* getChartsSaga({ navigation, payload }) {
  try {
    yield put(athenaAction.loading(true));
    let response = yield apiGetCharts({
      startDate: payload.startDate,
      endDate: payload.endDate,
      region: payload.region
    });
    if (response.data) {
      yield put(mainAction.setCharts(response.data?.data, response.data?.maxCount))
    }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'Get charts failed!' });
  } finally {
    yield put(athenaAction.loading(false));
  }
};

function* mainSaga() {
  yield all([takeEvery(types.SET_LOCATION, setLocationSaga)]);
  yield all([takeEvery(types.SET_FEEL, setFeelSaga)]);
  yield all([takeEvery(types.GET_LOCATIONS, getLocationsSaga)]);
  yield all([takeEvery(types.GET_ANALYTICS, getAnalyticsSaga)]);
  yield all([takeEvery(types.GET_CHARTS, getChartsSaga)]);
};

export default mainSaga;