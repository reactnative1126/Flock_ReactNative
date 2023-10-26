import { combineReducers } from 'redux';
import athenaReducer from './athena';
import authReducer from './auth';
import mainReducer from './main';

const rootReducer = combineReducers({
  athena: athenaReducer,
  auth: authReducer,
  main: mainReducer,
});

export default rootReducer;