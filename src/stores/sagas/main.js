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
    if (response.data) {
      yield put(authAction.updateUserInfo(response.data?.data[0]));
    }
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
      status: payload.status
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
      feeling_value: payload.feeling_value
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
      var aaa = Math.max(parseInt(response.data?.data?.anxiety[0]?.y), parseInt(response.data?.data?.anxiety[1]?.y), parseInt(response.data?.data?.anxiety[2]?.y), parseInt(response.data?.data?.anxiety[3]?.y), parseInt(response.data?.data?.anxiety[4]?.y, parseInt(response.data?.data?.anxiety[5]?.y), parseInt(response.data?.data?.anxiety[6]?.y)));
      var bbb = Math.max(parseInt(response.data?.data?.lonely[0]?.y), parseInt(response.data?.data?.lonely[1]?.y), parseInt(response.data?.data?.lonely[2]?.y), parseInt(response.data?.data?.lonely[3]?.y), parseInt(response.data?.data?.lonely[4]?.y, parseInt(response.data?.data?.lonely[5]?.y), parseInt(response.data?.data?.lonely[6]?.y)));
      var ccc = Math.max(parseInt(response.data?.data?.depressed[0]?.y), parseInt(response.data?.data?.depressed[1]?.y), parseInt(response.data?.data?.depressed[2]?.y), parseInt(response.data?.data?.depressed[3]?.y), parseInt(response.data?.data?.depressed[4]?.y, parseInt(response.data?.data?.depressed[5]?.y), parseInt(response.data?.data?.depressed[6]?.y)));
      var ddd = Math.max(parseInt(response.data?.data?.stressed[0]?.y), parseInt(response.data?.data?.stressed[1]?.y), parseInt(response.data?.data?.stressed[2]?.y), parseInt(response.data?.data?.stressed[3]?.y), parseInt(response.data?.data?.stressed[4]?.y, parseInt(response.data?.data?.stressed[5]?.y), parseInt(response.data?.data?.stressed[6]?.y)));
      var eee = Math.max(parseInt(response.data?.data?.grateful[0]?.y), parseInt(response.data?.data?.grateful[1]?.y), parseInt(response.data?.data?.grateful[2]?.y), parseInt(response.data?.data?.grateful[3]?.y), parseInt(response.data?.data?.grateful[4]?.y, parseInt(response.data?.data?.grateful[5]?.y), parseInt(response.data?.data?.grateful[6]?.y)));

      var max = Math.max(aaa, bbb, ccc, ddd, eee);

      yield put(mainAction.setCharts({ max, ...response.data?.data }))
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