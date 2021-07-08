import React from 'react'
import { StyleSheet } from 'react-native'


const app = {
    Name : "Rescue App",
    Icon : require('../../assets/app_icon.jpg'),
    navigation: {
        Main:'Main_App',
        SplashScreen:'SplashScreen',
        LoginScreen:'LoginScreen',
        RegisterScreen:'RegisterScreen',
        SatisticMainTab: 'SatisticMainTab',
        InfoRegistrationMainTab: 'InfoRegistrationMainTab',
        MainScreenNavigation: 'MainScreenNavigation',
        InfoRegistrationList: 'InfoRegistration_List_Registration',
        InfoRegistrationItemInfo: 'InfoRegistration_Item_Info',
        ModalPickGPS: 'Modal_Pick_GPS',
        Rescue: "Map_Rescue",
        RescueTab: "Rescue_Tab",
        RescueRegistration: "Rescue_Registration",
        RescueStartRescue: "Rescue_Start_rescue",
        UserInformation: "User_Information",
        ShowInfomationUser:"User_Show_infomation_user",
        EditInformation:"User_Edit_information",
        ListFlood: "User_Show_List_Flood"
    },
    api: {
        root: "http://34.126.92.44:8080/v1/api/",
        signin: `auth/signin`,
        signup: `auth/signup`,
        user: {
            getInfo: `accounts/`,
            getRegistration: `registrations/MyRegistrations`,
            followRegistration: `registrations/MyRegistrations?`,
            postRegistration: `registrations/users`,
            getFloodNoti: `floodNotifications`
        },
        rescuer: {
            registerLocation: 'locationRegistrations/wards/',
            startRescue: 'rescuerSaving/go?',
            stop: 'rescuerSaving/stop',
            sendGPS: 'rescuerSaving/GPS',
            getList: 'rescuerSaving/destinations',
            getRegistration: 'locationRegistrations/myRegistration/rescuer',
            saveDestination: 'rescuerSaving/saveDestinations/'
        }
    },
    apiImage:{
        root: "http://34.126.92.44:8082/",
        user:{
            getImage:"pythonService/registrations/images/item/",
            getListImage: "pythonService/registrations/images/list/",
            searchImage: "pythonService/registrations/searching/",
            saveImage:`pythonService/registrations/images/`
        }
    },
    role: {
        user: 'role_user',
        volunteer: 'role_volunteer',
        rescuer: 'role_rescuer',
        authority: 'role_authority'
    },
    state_victim:{
        unAuthentica: "STATE_UNAUTHENTICATED",
        safe: "STATE_SAVED",
        emergency: "STATE_EMERGENCY",
        danger: "STATE_DANGER"
    },
    minDistance: 100,
    edgePadding:{
            top:600,
            bottom:300,
            left: 9,
            right: 9
    }
}

const actionsType = {
    appNavigation:{
        loggedIn: "MAIN_APP_NAVIGATION_LOGGEDIN",
        loggedOut: "MAIN_APP_NAVIGATION_LOGGEDOUT",
        start:'MAIN_APP_START'
    },
    auth:{
        storeAuthentication: 'STORE_AUTHENTICATION',
        deleteToken: 'AUTH_DELETE_TOKEN'
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
    },
    registration: {
        setName: "REGISTRATION_SETNAME",
        setNumPerson: "REGISTRATION_SET_NUM_PERSON",
        setPhone: "REGISTRATION_setPhone",
        setLongitude: "REGISTRATION_setLongitude",
        setLatitude: "REGISTRATION_setLatitude",
        setWardId: "REGISTRATION_setWardId",
        setNullError: "REGISTRATION_setNullError",
        setErrorNumPersion: "REGISTRATION_setErrorNumPerson",
        setErrorPhone: "REGISTRATION_setErrorPhone",
        setErrorWardId: "REGISTRATION_setErrorWardId",
        setInfoOfItem: "REGISTRATION_setInfoOfItem",
        setImage: "REGISTRATION_setImage",
        setListData: "REGISTRATION_setList",
        setLoadingListTrue: "REGISTRATION_setLoadingList_True",
        setLoadingListFalse: "REGISTRATION_setLoadingList_False",
        setNullInfo: "REGISTRATION_setNull_Info",
        setErrorStatus: "REGISTRATION_set_error_post_request",
        setStatus: "REGISTRATION_set_status_post_request"
    },
    rescue:{
        setUserLocation: "Rescue_set_user_location",
        setListVictim: "Rescue_set_list_victim",
        setBoardSize: "Rescue_set_boardSize",
        setCloserListVictim: "Rescue_set_closer_list_victim",
        addRefIndexToItem: "Rescue_set_ref_index_to_item",
        setSelectItem: "Rescue_set_Select_item",
        setStartLocation: "Rescue_set_Start_location",
        setDestinationList: "Rescue_set_Destination_List",
        refreshGo: "Rescue_refresh_go",
        setRouteToDestinationList: "Rescue_set_route_to_destination_list",
        setGobutton: "Rescue_set_go_button",
        setListTrace: "Rescue_set_list_trace",
        setRotateDegUser: 'Rescue_set_rotate_deg_user',
        addItemToMemory: 'Rescue_add_item_to_memory',
        removeItemToMemory: 'Rescue_remove_item_from_memory',
        setLaterForItemOfDestinationList: 'Rescue_set_later_prop_for_item_of_destination_list'
    },
    userinfo:{
        setEmail:'UserInfo_Set_Password',
        setPhone:'UserInfo_Set_Phone',
        setFirstName:"UserInfo_Set_First_Name",
        setLastName:"UserInfo_Set_Last_Name",
        setAllInfo:"UserInfo_Set_all_Info"
    }
}

const regexTypes={
    name:{
        regex:/^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
        messageErr:"your name is invalid"
    },
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