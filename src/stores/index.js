import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducers';
import sagas from './sagas';

const peresistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['auth'],
  blacklist: ['athena', 'main'],
};

const persistedReducer = persistReducer(peresistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(...[sagaMiddleware]));
sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

export default store;