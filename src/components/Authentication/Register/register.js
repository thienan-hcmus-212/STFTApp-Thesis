import React, { useEffect } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { connect } from 'react-redux'
import { checkStatus } from '../../../core/Service/authentication'
import { actionsType, app } from '../../../globals/constants'
import RegisterContainer from '../../Container/Register/RegisterContainer/register-container'


const Register = (props) => {
    const { navigation, resetStatus } = props
    const { status, error, isLoading } = props.status

    useFocusEffect(
        React.useCallback(()=>{
            return ()=>{
                resetStatus();
            }
        },[])
    )

    useEffect(() => {
        const isSuccess = checkStatus(status)
        status?
            Alert.alert("Thông báo Đăng kí: ",
                `${ isSuccess ? "Thành công" : `${error.message}`}`,
                [
                    isSuccess?
                    {
                        text: "Login",
                        style: "cancel",
                        onPress : () => navigation.navigate(app.navigation.LoginScreen),
                    }: null,
                    {
                        text: "Cancel",
                        style: "cancel",
                        onPress: ()=>{
                            resetStatus();
                        }
                    }
                ]) : null
    }, [status])

    return (
        <View style={styles.container}>
            {isLoading ?
                <View style={{flex:1,justifyContent: 'center' , alignItems: 'center'}}>
                    <ActivityIndicator size={90} color="blue" />
                </View> 
                :
                <RegisterContainer navigation={navigation} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
})

const mapStateToProps = (state) => {
    return {
        status: state.register.status
    }
}

const mapFuncToProps = (dispatch) =>{
    return {
        resetStatus: ()=> dispatch({type: actionsType.register.resetStatus})
    }
}

export default connect(mapStateToProps,mapFuncToProps)(Register)