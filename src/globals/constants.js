import React from 'react'
import { StyleSheet } from 'react-native'


const app = {
    Name : "Flood App",
    Icon : require('../../assets/app_icon.jpg'),
    navigation: {
        SplashScreen:'SplashScreen',
        LoginScreen:'LoginScreen',
        RegisterScreen:'RegisterScreen',
        SatisticMainTab: 'SatisticMainTab',
        InfoRegistrationMainTab: 'InfoRegistrationMainTab',
        MainScreenNavigation: 'MainScreenNavigation'
    },
    api: {
        root: "http://34.126.80.26:80/v1/api/",
        signin: `auth/signin/`,
        signup: `auth/signup/`,
        user: {
            getInfo: `accounts/`
        }
    },
    role: {
        user: 'role_user',
        volunteer: 'role_volunteer',
        rescuer: 'role_rescuer',
        authority: 'role_authority'
    }
}

const actionsType = {
    appNavigation:{
        loggedIn: "MAIN_APP_NAVIGATION_LOGGEDIN",
        loggedOut: "MAIN_APP_NAVIGATION_LOGGEDOUT"
    },
    auth:{
        storeAuthentication: 'STORE_AUTHENTICATION',
    },
    login: {
        onChangeUsername: 'ON_CHANGE_TEXT_USERNAME',
        onChangePassword: 'ON_CHANGE_TEXT_PASSWORD',
        loginSuccess: 'LOGIN_SUCCESS',
        loginFail: 'LOGIN_FAIL',
        startLogin: 'LOGIN_STARTLOGIN',
        onSaveRefUserName: 'ON_SAVE_REF_USERNAME',
        onSaveRefPassword: 'ON_SAVE_REF_PASSWORD'
    },
    register: {
        onChangeUsername: 'ON_CHANGE_TEXT_USERNAME',
        onChangePassword: 'ON_CHANGE_TEXT_PASSWORD',
        onChangeFirstname: 'ON_CHANGE_TEXT_FIRSTNAME',
        onChangeLastname: 'ON_CHANGE_TEXT_LASTNAME',
        onChangePhone: 'ON_CHANGE_TEXT_PHONE',
        onChangeEmail: 'ON_CHANGE_TEXT_EMAIL',
        onChangeConfirmPassword: 'ON_CHANGE_TEXT_CONFIRM_PASSWORD',
        registerSuccess: 'REGISTER_SUCCESS',
        registerFail: 'REGISTER_FAIL',
        registerStart: 'REGISTER_START',
        resetStatus: 'REGISTER_RESET_STATUS',
        changeRoleUser: 'REGISTER_CHANGE_ROLE_USER'
    }
}

const regexTypes={
    email:{
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        messageErr: "Your email address is invalid"
    },
    phone:{
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        messageErr: "Your phone is invalid in VietNam"
    },
    username:{
        regex: /([a-zA-Z0-9_]{8,40})/,
        messageErr: "Username can be include 0-9, a-z, A-Z, _. And not less than 8"
    },
    password:{
        regex: /[a-zA-Z0-9]{8,40}/,
        messageErr: "Password can be include 0-9, a-z, A-Z. And not less than 8"
    }
}

const stylesMain = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        width:'90%',
        borderWidth: 1,
        borderRadius: 5,
        height:36,
        margin:4
    }
})

export { app , actionsType , stylesMain , regexTypes }