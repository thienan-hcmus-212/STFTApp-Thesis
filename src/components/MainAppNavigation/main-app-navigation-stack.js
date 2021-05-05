import React, { useEffect, useReducer } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

import SplashScreen from '../../components/SplashScreen/splash-screen';
import { actionsType, app } from '../../globals/constants';
import Login from '../Authentication/Login/login';
import Register from '../Authentication/Register/register'
import MainScreenNavigation from '../Main/MainNavigation/main-screen-navigation';
import { isValidToken } from '../../core/Service/authentication'

const MainAppNavigationStack = createStackNavigator()

const initMainApp = {
    isLoading: true,
    isLogin: false,
}

const MainAppNavigationReducer = (state, action) => {
    switch (action.type) {
        case actionsType.appNavigation.loggedIn:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
            }
        case actionsType.appNavigation.loggedOut:
            return {
                ...state,
                isLoading: false,
                isLogin: false,
            }
        default:
            throw new Error()
    }
}


const MainAppNavigation = (props) => {

    const [state, dispatch] = useReducer(MainAppNavigationReducer, initMainApp)
    const { auth } = props

    const loginSuccess = () => {
        dispatch({ type: actionsType.appNavigation.loggedIn })
    }

    useEffect(() => {
        isValidToken(auth)
            .then(() => {
                //console.log("ok")
                dispatch({ type: actionsType.appNavigation.loggedIn })
            })
            .catch((error) => {
                //console.log(error.error)
                dispatch({ type: actionsType.appNavigation.loggedOut })
            })
    }, [])
    return (
        //<MainAppNavigationStackProvider value = {navigation}>
        <>
            {state.isLoading ? <SplashScreen />
                :
                state.isLogin ?
                    <MainAppNavigationStack.Navigator>
                        <MainAppNavigationStack.Screen
                            name={app.navigation.MainScreenNavigation}
                            component={MainScreenNavigation}
                            options={{ headerShown: false }}
                        />
                    </MainAppNavigationStack.Navigator>
                    :
                    <MainAppNavigationStack.Navigator>
                        <MainAppNavigationStack.Screen
                            name={app.navigation.LoginScreen}
                            component={Login}
                            options={{ headerShown: false }}
                            initialParams={{ loginSuccess }}
                        />
                        <MainAppNavigationStack.Screen
                            name={app.navigation.RegisterScreen}
                            component={Register}
                            options={{ title: "Create account" }}
                        />
                    </MainAppNavigationStack.Navigator>}
        </>
        //</MainAppNavigationStackProvider>


    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapFuncToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapFuncToProps)(MainAppNavigation)