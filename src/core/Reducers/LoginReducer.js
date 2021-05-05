import { actionsType } from "../../globals/constants"

const initLogin = {
    username: '',
    password: '',
    status:{
        isLoading: false,
        error: null,
        status:0,
        data:{}
    }
}

const loginReducer = (state = initLogin, action) => {
    switch (action.type) {
        case actionsType.login.onChangeUsername:
            return {
                ...state,
                username: action.username
            }
        case actionsType.login.onChangePassword:
            return {
                ...state,
                password: action.password
            }

        case actionsType.login.startLogin:
            return {
                ...state,
                status:{
                    ...state.status,
                    isLoading: true,
                    error: null,
                    status: 0,
                    data: null
                }
                
            }
        case actionsType.login.loginSuccess:
            return {
                ...state,
                status:{
                    ...state.status,
                    isLoading: false,
                    status: action.status,
                    data: action.data,
                    error: null,
                }
                
            }
        case actionsType.login.loginFail:
            return {
                ...state,
                status:{
                    ...state.status,
                    isLoading: false,
                    status: action.status,
                    data: null,
                    error: action.error,
                }
                
            }
    }
    return state;
}

export default loginReducer