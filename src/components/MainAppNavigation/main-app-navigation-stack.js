import React, { useCallback, useLayoutEffect, useReducer, useEffect, useState, createContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

import SplashScreen from '../../components/SplashScreen/splash-screen';
import { actionsType, app } from '../../globals/constants';
import Login from '../Authentication/Login/login';
import Register from '../Authentication/Register/register'
import MainScreenNavigation from '../Main/MainNavigation/main-screen-navigation';
import { isValidToken } from '../../core/Service/authentication'


import { storeAuthentication } from '../../core/Actions/AuthenticationAction';
import { AuthenticationContext } from '../Context/authentication-context';

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
        case actionsType.appNavigation.start:
            return {
                ...initMainApp
            }
        default:
            throw new Error()
    }
}

const MainAppNavigation = (props) => {

    const [state, dispatch] = useReducer(MainAppNavigationReducer, initMainApp)
    const { auth } = props
    const { loginSuccessed, logoutSuccessed } = props
    const [roles,setRoles] = useState({})

    const login = (data) => {
        loginSuccessed(data)
        dispatch({ type: actionsType.appNavigation.loggedIn })
    }
    const logout = () => {
        dispatch({ type: actionsType.appNavigation.start })
        logoutSuccessed()
        setTimeout(() => {
            dispatch({ type: actionsType.appNavigation.loggedOut })
        }, 2000)
    }
    useEffect(() => {
        dispatch({ type: actionsType.appNavigation.start })
        setTimeout(() => {
            isValidToken(auth)
                .then((roles) => {
                    setRoles(roles)
                    dispatch({ type: actionsType.appNavigation.loggedIn })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch({ type: actionsType.appNavigation.loggedOut })
                })
        },0)
    }, [])

    return (
        //<MainAppNavigationStackProvider value = {navigation}>
        <>
            {state.isLoading ? <SplashScreen />
                :
                state.isLogin ?
                    <AuthenticationContext.Provider value={{ logout, roles }}>
                        <MainAppNavigationStack.Navigator>
                            <MainAppNavigationStack.Screen
                                name={app.navigation.MainScreenNavigation}
                                component={MainScreenNavigation}
                                options={{ headerShown: false }}
                            />
                        </MainAppNavigationStack.Navigator>
                    </AuthenticationContext.Provider>
                    :
                    <AuthenticationContext.Provider value={{ login }}>
                        <MainAppNavigationStack.Navigator>
                            <MainAppNavigationStack.Screen
                                name={app.navigation.LoginScreen}
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <MainAppNavigationStack.Screen
                                name={app.navigation.RegisterScreen}
                                component={Register}
                                options={{ title: "Create account" }}
                            />
                        </MainAppNavigationStack.Navigator>
                    </AuthenticationContext.Provider>
            }
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
        loginSuccessed: (data) => dispatch(storeAuthentication(data)),
        logoutSuccessed: () => dispatch({ type: actionsType.auth.deleteToken })
    }
}

export default connect(mapStateToProps, mapFuncToProps)(MainAppNavigation)