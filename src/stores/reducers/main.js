import types from '@stores/types';

const initialState = {
  locations: [],
  analytics: null,
  maxCount: {
    anxiety: 10,
    depressed: 10,
    grateful: 10,
    lonely: 10,
    stressed: 10
  },
  charts: {
    anxiety: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 }
    ],
    lonely: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 }
    ],
    depressed: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 }
    ],
    stressed: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 }
    ],
    grateful: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 }
    ]
  }
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case types.SET_ANALYTICS:
      return {
        ...state,
        analytics: action.payload,
      };
    case types.SET_CHARTS:
      return {
        ...state,
        charts: action.payload,
        maxCount: action.maxCount
      };
    default:
      return state;
  }
};