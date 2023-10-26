import types from '@stores/types';

const initialState = {
  userInfo: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        userInfo: null,
      };
    case types.UPDATE_USERINFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case types.UPDATE_FEELDATA:
      return {
        ...state,
        userInfo: {
          ...state.userInfo, feelingData: {
            ...state.userInfo?.feelingData,
            ...action.payload
          }
        },
      };
    default:
      return state;
  }
};