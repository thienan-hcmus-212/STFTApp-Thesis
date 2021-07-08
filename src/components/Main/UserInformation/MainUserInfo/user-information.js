import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ShowUserInfo from '../ShowInfo/show-user-info';
import { app } from '../../../../globals/constants';
import EditInformation from '../Edit/edit-infomation';

const MainUserInfoStack = createStackNavigator()
const UserInformation = ()=>{
    return (
        <MainUserInfoStack.Navigator>
            <MainUserInfoStack.Screen
                component={ShowUserInfo}
                name={app.navigation.ShowInfomationUser}
                options={{
                    title: 'Thông tin cá nhân',
                    headerStyle: {
                        backgroundColor: 'aqua',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <MainUserInfoStack.Screen
                component={EditInformation}
                name={app.navigation.EditInformation}
                options={{
                    title: 'Thây đổi thông tin cá nhân',
                    headerStyle: {
                        backgroundColor: 'aqua',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </MainUserInfoStack.Navigator>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
})

export default UserInformation