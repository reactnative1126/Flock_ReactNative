import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Toast from 'react-native-toast-message';

import store, { persistor } from '@stores';
import AppContainer from '@navigations';
import { Loading } from '@components';

LogBox.ignoreLogs([
  'Warning: ...',
  '[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!',
]);
LogBox.ignoreAllLogs(true);


export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
        <Loading />
        <Toast />
      </PersistGate>
    </Provider>
  );
};