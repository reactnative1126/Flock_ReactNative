import types from '@stores/types';

export default class authAction {
  static loading = (data) => ({
    type: types.SET_LOADING,
    payload: data,
  });
}