import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'

import { connect } from 'react-redux'
import LoginContainer from '../../Container/Login/LoginContainer/login-container'

import { checkStatus, loginSuccess, loginFail } from '../../../core/Service/authentication'
import { storeAuthentication } from '../../../core/Actions/AuthenticationAction'


const Login = (props) => {

    const { status, isLoading, error, data } = props.status
    const { navigation ,storeAuth } = props
    useEffect(() => {
        (status) ?
            checkStatus(status) ? loginSuccess(data, storeAuth, props.route.params.loginSuccess) : loginFail(error) :
            null
    }, [status])

    return (
        <View style={{ flex: 1 }}>
            {isLoading ?
                <View style={styles.container}>
                    <ActivityIndicator size={90} color="blue" />
                </View>
                :
                <LoginContainer navigation={navigation} error={error}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});

const mapStateToProps = (state) => {
    return {
        status: state.login.status,
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        storeAuth: (data) => dispatch(storeAuthentication(data))
    }
}

export default connect(mapStateToProps, mapFuncToProps)(Login)