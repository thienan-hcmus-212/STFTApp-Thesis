import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { app } from '../../../globals/constants';
import Satistic from '../Satistic/satistic';
import InfoRegistration from '../InfoRegistration/MainInfoRegistration/info-registration'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PickGPS from '../InfoRegistration/PickGPS/pick-gps';
import MainRescue from '../Rescue/MainRescue/MainRescue';
import Rescue from '../Rescue/Rescue/rescue';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const MainTabNavigation = () => {
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
          } else if (route.name === app.navigation.RescueTab) {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // tabBarLabel: ({focused,color, size}) =>{

        // }
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >

      <Tab.Screen
        name={app.navigation.InfoRegistrationMainTab}
        component={InfoRegistration}
        options={{ title: "Thông tin đăng kí" }}
      />
      <Tab.Screen
        name={app.navigation.RescueTab}
        component={MainRescue}
        options={{ title: "Cứu" }}
      />
      <Tab.Screen
        name={app.navigation.SatisticMainTab}
        component={Satistic}
        options={{ title: "Thống kê" }}
      />
    </Tab.Navigator>
  )
}

const MainScreenNavigation = () => {
  return (
    <Stack.Navigator mode="modal" initialRouteName={app.navigation.Rescue}>
      <Stack.Screen
        name={"Main"}
        component={MainTabNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={app.navigation.ModalPickGPS}
        component={PickGPS}
        options={{ title: "Chọn vị trí trên bản đồ" }}
      />
      <Stack.Screen
        name={app.navigation.Rescue}
        component={Rescue}
        options={{headerShown: false}}
        initialParams={{boardSize: 4}}
      />

    </Stack.Navigator>


  )

}

export default MainScreenNavigation