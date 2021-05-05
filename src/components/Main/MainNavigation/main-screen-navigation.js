import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { app } from '../../../globals/constants';
import Satistic from '../Satistic/satistic';
import InfoRegistration from '../InfoRegistration/info-registration';


const Tab = createBottomTabNavigator()

const MainScreenNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name={app.navigation.SatisticMainTab} 
                component={Satistic}/>
            <Tab.Screen 
                name={app.navigation.InfoRegistrationMainTab}
                component={InfoRegistration}/> 
        </Tab.Navigator>
    )

}

export default MainScreenNavigation