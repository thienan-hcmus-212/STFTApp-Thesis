import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { app } from '../../../../globals/constants'
import RegisterLocation from '../Registration/registrationLocation'
import StartRescue from '../StartRescue/start-rescue'
import { getWardIdRegistration } from '../../../../core/Service/rescueRegistration'

import { connect } from 'react-redux'

const MainRescueNavigationStack = createStackNavigator()

const MainRescue = (props) => {

    const [isLoading, setIsLoading] = useState(true)
    const [wardId, setWardId] = useState(null)

    const { navigation } = props
    const { auth } = props
    
    useLayoutEffect(() => {
        getWardIdRegistration(auth).then((wardId) => {
            setWardId(wardId)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [])

    const setFinalWardId = (wardId) => {
        setWardId(wardId)
        navigation.navigate(app.navigation.RescueTab)
    }

    const deleteWardId = () =>{
        setWardId(null)
        navigation.navigate(app.navigation.RescueTab)
    }

    return (
        <>
            {isLoading ?
                <View style={styles.container}>
                    <ActivityIndicator size={90} color="blue" />
                </View>
                :

                !wardId ?
                    <MainRescueNavigationStack.Navigator>
                        <MainRescueNavigationStack.Screen
                            component={RegisterLocation}
                            name={app.navigation.RescueRegistration}
                            options={{
                                title: 'Đăng kí Địa điểm cứu hộ',
                                headerStyle: {
                                    backgroundColor: 'aqua',
                                },
                                headerTintColor: '#000',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                            initialParams={{ setFinalWardId: (wardId) => setFinalWardId(wardId) }}
                        />
                    </MainRescueNavigationStack.Navigator>

                    : <MainRescueNavigationStack.Navigator>
                        <MainRescueNavigationStack.Screen
                            component={StartRescue}
                            name={app.navigation.RescueStartRescue}
                            options={{
                                title: 'Bắt đầu xuất phát',
                                headerStyle: {
                                    backgroundColor: 'aqua',
                                },
                                headerTintColor: '#000',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                            initialParams={{deleteWardId:()=>deleteWardId(), wardId: wardId }}
                        />
                    </MainRescueNavigationStack.Navigator>
            }
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapFuncToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapFuncToProps)(MainRescue)