import types from '@stores/types';

export default class authAction {
  static signIn = (navigation, data) => ({
    type: types.SIGN_IN,
    navigation: navigation,
    payload: data
  });
  static signInSuccess = (navigation, data) => ({
    type: types.SIGN_IN_SUCCESS,
    navigation: navigation,
    payload: data,
  });
  static signInFailure = (error) => ({
    type: types.SIGN_IN_FAILURE,
    payload: error,
  });

  static signUp = (navigation, data) => ({
    type: types.SIGN_UP,
    navigation: navigation,
    payload: data,
  });
  static signUpSuccess = (navigation, data) => ({
    type: types.SIGN_UP_SUCCESS,
    navigation: navigation,
    payload: data,
  });
  static signUpFailure = (error) => ({
    type: types.SIGN_UP_FAILURE,
    payload: error,
  });

  static signOut = (navigation) => ({
    type: types.SIGN_OUT,
    navigation: navigation,
  });
  static signOutSuccess = (navigation) => ({
    type: types.SIGN_OUT_SUCCESS,
    navigation: navigation,
  });
  static signOutFailure = (error) => ({
    type: types.SIGN_OUT_FAILURE,
    payload: error,
  });
  static updateUserInfo = (data) => ({
    type: types.UPDATE_USERINFO,
    payload: data,
  });
  static updateFeelData = (data) => ({
    type: types.UPDATE_FEELDATA,
    payload: data,
  });
}