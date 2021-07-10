import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { app, headersStyle } from '../../../../globals/constants'
import RegisterLocation from '../Registration/registrationLocation'
import StartRescue from '../StartRescue/start-rescue'
import { getWardIdRegistration } from '../../../../core/Service/rescueRegistration'

import { connect } from 'react-redux'

const MainRescueNavigationStack = createStackNavigator()

const MainRescue = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [wardId, setWardId] = useState(null)

    const { navigation } = props
    const { auth } = props

    useEffect(()=>{
        setIsLoading((isLoading) => isLoading = true)
        getWardIdRegistration(auth).then((wId) => {
            setWardId((wardId)=>wardId=wId)
            setIsLoading((isLoading) => isLoading = false)
        }).catch(() => {
            setIsLoading((isLoading) => isLoading = false)
        })
    },[auth])

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
                                ...headersStyle
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
                                ...headersStyle
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