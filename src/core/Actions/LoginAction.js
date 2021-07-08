import { actionsType, app } from "../../globals/constants"
import { axiosNoToken } from "../../api/api"
import axios from "axios"

const onChangeUsername = (t) => {
    return {
        type: actionsType.login.onChangeUsername,
        username: t
    }
}

const onChangePassword = (t) => {
    return {
        type: actionsType.login.onChangePassword,
        password: t
    }
}

const onLoginSuccess = (response) =>{
    return {
        type: actionsType.login.loginSuccess, 
        data: response.data, 
        status: response.status,
        error: null,
    }
}

const onLoginFail = (error) =>{
    return {
        type: actionsType.login.loginFail, 
        error: error.data || {message: error.toString()}, 
        status: error.status || 400,
        data: null 
    }
}

const onPressLogin = (funcLogin) => {

    return (dispatch, getState) => {
        const { username, password } = getState().login
        dispatch({ type: actionsType.login.startLogin })

        axiosNoToken.post(`${app.api.signin}`, {
            username,
            password
        }, {
            timeout: 1000
        }).then((response) => {
            funcLogin(response.data)
            dispatch(onLoginSuccess(response))
        }).catch((error) => {
                error.response?
                    dispatch(onLoginFail(error.response)):
                    dispatch(onLoginFail(error))
            })
    }
}

export { onChangeUsername, onChangePassword, onPressLogin }