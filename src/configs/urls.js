const baseUrl = 'https://us-central1-flock-llc-app-development.cloudfunctions.net';

export default Urls = {
  SIGN_UP: baseUrl + '/createUser',
  SIGN_IN: baseUrl + '/loginUser',
  SET_LOCATION: baseUrl + '/updateCurrentLocation',
  SET_FEEL: baseUrl + '/updateFeelingStatus',
  GET_LOCATIONS: baseUrl + '/getUserLocationsByFeeling',
  GET_ANALYTICS: baseUrl + '/getAnalyticsFeeling',
  GET_CHARTS: baseUrl + '/getAnalyticsFeelingForGraph'
};