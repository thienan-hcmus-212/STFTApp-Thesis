import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'

import { connect } from 'react-redux'
import LoginContainer from '../../Container/Login/LoginContainer/login-container'


const Login = (props) => {

    const { status, isLoading, error, data } = props.status
    const { navigation } = props
    
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

    }
}

export default connect(mapStateToProps, mapFuncToProps)(Login)