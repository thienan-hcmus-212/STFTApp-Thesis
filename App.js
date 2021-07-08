import React from 'react';
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/core/Store/store'

import { NavigationContainer } from '@react-navigation/native'
import MainAppNavigation from './src/components/MainAppNavigation/main-app-navigation-stack'
import {createStackNavigator} from '@react-navigation/stack'

import Test from './Test'
import { StatusBar } from 'react-native';
import { app } from './src/globals/constants';

const MainStack = createStackNavigator()
export default function App()  {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>

          <StatusBar 
            animated={true}
            backgroundColor="black"
          ></StatusBar>

          <MainStack.Navigator>
            <MainStack.Screen
              component={MainAppNavigation}
              name={app.navigation.Main}
              options={{headerShown: false}}
            />

          </MainStack.Navigator>
      
        </PersistGate>
      </Provider>
    </NavigationContainer>

    // <Test>

    // </Test>
  );
}
