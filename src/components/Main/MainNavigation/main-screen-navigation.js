import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { app } from '../../../globals/constants';
import Satistic from '../Satistic/satistic';
import InfoRegistration from '../InfoRegistration/MainInfoRegistration/info-registration'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const MainScreenNavigation = () => {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === app.navigation.InfoRegistrationMainTab) {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === app.navigation.SatisticMainTab) {
            iconName = focused ? 'ios-list' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // tabBarLabel: ({focused,color, size}) =>{

        // }
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >

      <Tab.Screen
        name={app.navigation.InfoRegistrationMainTab}
        component={InfoRegistration} 
        options={{title: "Thông tin đăng kí"}}
        />
      <Tab.Screen
        name={app.navigation.SatisticMainTab}
        component={Satistic} 
        options={{title: "Thống kê"}}
        />
    </Tab.Navigator>
  )

}

export default MainScreenNavigation