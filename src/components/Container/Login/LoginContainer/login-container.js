import React, { useContext, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'

import InputText from '../../../Common/input-text';
import LogoApp from '../../../Common/logo-app';
import { app, stylesMain } from '../../../../globals/constants';
import { onChangePassword, onChangeUsername, onPressLogin } from '../../../../core/Actions/LoginAction'
import { AuthenticationContext } from '../../../Context/authentication-context';

const LoginContainer = (props) => {

    const { username, password, error } = props
    const { onChangeUsername, onChangePassword, onPressLogin } = props
    const { navigation } = props

    const ref_username=useRef()
    const ref_password=useRef()
    const [focusPassword,setFocusPassword] = useState()
    const [focusLogin,setFocusLogin] = useState()
    const {login} = useContext(AuthenticationContext)

    useEffect(()=>{
        const focusP=()=>ref_password.current?.focus()
        const focusL=()=>onPressLogin()
        setFocusPassword(()=>focusP)
        setFocusLogin(()=>focusL)
    },[])
    
    

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <LogoApp size={150} textSize={0} />
            </View>
            
            <InputText
                name="Tên đăng nhập"
                val={username}
                onChangeText={onChangeUsername} 
                ref={ref_username}
                onSubmit={focusPassword}
                
                autoFocus="true"
                />

            <InputText
                name="Mật khẩu"
                val={password}
                onChangeText={onChangePassword}
                ref={ref_password}
                onSubmit={focusLogin}
                password="true" />
            <Text style={styles.error_text}>{error?.message}</Text>
            <TouchableOpacity
                style={{ ...stylesMain.button, backgroundColor: 'aqua', marginTop: 12 }}
                onPress={() => {
                    Keyboard.dismiss
                    onPressLogin(login)
                }}
            >
                <Text>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ ...stylesMain.button, backgroundColor: 'white' }}
                onPress={() => navigation.navigate(app.navigation.RegisterScreen)}
            >
                <Text>Đăng kí</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logo: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        height: "40%"
    },
    error_text: {
        color: 'red',
        fontSize: 13,
    }
})



const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        password: state.login.password,
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        onChangeUsername: (t) => dispatch(onChangeUsername(t)),
        onChangePassword: (t) => dispatch(onChangePassword(t)),
        onPressLogin: (funcLogin) => dispatch(onPressLogin(funcLogin)),
    }
}

export default connect(mapStateToProps, mapFuncToProps)(LoginContainer)

