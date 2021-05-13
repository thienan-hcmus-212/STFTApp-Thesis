import React from 'react';
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/core/Store/store'

import { NavigationContainer } from '@react-navigation/native'
import MainAppNavigation from './src/components/MainAppNavigation/main-app-navigation-stack'


import Test from './Test'
import { StatusBar } from 'react-native';


export default function App()  {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar></StatusBar>
          <MainAppNavigation/>
          
        </PersistGate>
      </Provider>
    </NavigationContainer>

    // <Test>

    // </Test>
  );
}
