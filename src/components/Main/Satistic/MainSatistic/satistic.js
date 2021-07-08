import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import ListFlood from '../ListFlood/list-flood'
import { app } from '../../../../globals/constants'

const MainSatisticNavigator = createStackNavigator()

const Satistic = ()=>{
    return (
        <MainSatisticNavigator.Navigator>
            <MainSatisticNavigator.Screen
                component={ListFlood}
                name={app.navigation.ListFlood}
                options={{
                    title: 'Những xã đang xảy ra lũ',
                    headerStyle: {
                        backgroundColor: 'aqua',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </MainSatisticNavigator.Navigator>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
})

export default Satistic