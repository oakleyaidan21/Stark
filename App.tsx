import React from 'react';
import { loadUIConfig } from './src/config/uiConfig';
import { decode, encode } from 'base-64';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Stark from './src/Stark';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
require('react-native-ui-lib/config').setConfig({ appScheme: 'default' });

// These next three blocks are for snoowrap shenannigans
declare var global: any;

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

loadUIConfig();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stark />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
