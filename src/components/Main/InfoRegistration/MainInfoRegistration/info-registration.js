import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ListRegistration from '../ListRegistration/list-registration'
import { app } from '../../../../globals/constants'
import infoARegistration from '../InfoARegistration/info-a-registration';



const MainRegistrationNavigator = createStackNavigator()

const InfoRegistration = () => {

    return (
        
        <MainRegistrationNavigator.Navigator initialRouteName={app.navigation.InfoRegistrationList}>
            <MainRegistrationNavigator.Screen
                component={ListRegistration}
                name={app.navigation.InfoRegistrationList}
                options={{
                    title: 'Danh Sách đăng kí',
                    headerStyle: {
                        backgroundColor: 'aqua',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <MainRegistrationNavigator.Screen
                component={infoARegistration}
                name={app.navigation.InfoRegistrationItemInfo}
                options={{
                    title:'Thông tin đăng kí',
                    headerStyle: {
                        backgroundColor: 'aqua',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </MainRegistrationNavigator.Navigator>
    )
}

export default InfoRegistration