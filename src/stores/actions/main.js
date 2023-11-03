import types from '@stores/types';

export default class mainAction {
  static setLocation = (navigation, data) => ({
    type: types.SET_LOCATION,
    navigation: navigation,
    payload: data
  });
  static setFeel = (navigation, data) => ({
    type: types.SET_FEEL,
    navigation: navigation,
    payload: data
  });
  static getLocations = (navigation, data) => ({
    type: types.GET_LOCATIONS,
    navigation: navigation,
    payload: data
  });
  static updateLocations = (data) => ({
    type: types.UPDATE_LOCATIONS,
    payload: data
  });
  static getAnalytics = (navigation, data) => ({
    type: types.GET_ANALYTICS,
    navigation: navigation,
    payload: data
  });
  static setAnalytics = (data) => ({
    type: types.SET_ANALYTICS,
    payload: data
  });
  static getCharts = (navigation, data) => ({
    type: types.GET_CHARTS,
    navigation: navigation,
    payload: data
  });
  static setCharts = (data, maxCount) => ({
    type: types.SET_CHARTS,
    payload: data,
    maxCount
  });
}