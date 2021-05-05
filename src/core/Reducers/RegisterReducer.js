import { actionsType } from "../../globals/constants"

const initRegister = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    role: ["role_user"],//["role_user", "role_volunteer", "role_rescuer", "role_authority"],
    passwordConfirm: '',
    status: {
        isLoading: false,
        status: 0,
        error: null
    }
}


const registerReducers = (state = initRegister, action) => {
    switch (action.type) {
        case actionsType.register.onChangeUsername:
            return {
                ...state,
                username: action.t
            }
        case actionsType.register.onChangePassword:
            return {
                ...state,
                password: action.t
            }
        case actionsType.register.onChangeFirstname:
            return {
                ...state,
                firstname: action.t
            }
        case actionsType.register.onChangeLastname:
            return {
                ...state,
                lastname: action.t
            }
        case actionsType.register.onChangePhone:
            return {
                ...state,
                phone: action.t
            }
        case actionsType.register.onChangeEmail:
            return {
                ...state,
                email: action.t
            }
        case actionsType.register.onChangeConfirmPassword:
            return {
                ...state,
                passwordConfirm: action.t
            }

        case actionsType.register.registerStart:
            return {
                ...state,
                status: {
                    ...state,
                    isLoading: true,
                    status: null,
                    error: null,
                }
            }
        
        case actionsType.register.registerSuccess:
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: false,
                    status: action.status,
                    error: action.error
                }
            }
        case actionsType.register.registerFail:
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: false,
                    status: action.status,
                    error: action.error
                }
            }
        case actionsType.register.resetStatus:
            return {
                ...state,
                status: {
                    ...state.status,
                    status: null
                }
            }
        case actionsType.register.changeRoleUser:
            return {
                ...state,
                role: action.role
            }
    }
    return state
}


export default registerReducers