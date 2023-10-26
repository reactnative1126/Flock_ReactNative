import types from '@stores/types';

const initialState = {
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};