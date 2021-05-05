import { actionsType } from '../../globals/constants'
import axios from 'axios'

const onChangeText=(t, type)=>{
    return {
        type: type,
        t: t
    }
}

const onRegisterSuccess=(response)=>{
    return {
        type: actionsType.register.registerSuccess, 
        status: response.status,
        error: null
    }
}

const onRegisterFail=(error) =>{
    return {
        type: actionsType.register.registerFail, 
        error: error.data || {message: error.toString()}, 
        status: error.status || 400 
    }
}

const onPressRegister = () =>{
    const url = 'http://34.87.145.78:80/v1/api/auth'

    const authAxios = axios.create({
        baseURL: url,
        headers: {

        }
    })

    return (dispatch, getState) => {

        const { username, password , phone, email, firstname, lastname, role } = getState().register
        dispatch({ type: actionsType.register.registerStart })

        authAxios.post(`/signup`, {
            username,
            password,
            firstname,
            lastname,
            phone,
            email,
            role
        }, {
            timeout: 3000
        }).then((response) => {
                dispatch(onRegisterSuccess(response))
        }).catch((error) => {
                error.response?
                    dispatch(onRegisterFail(error.response)):
                    dispatch(onRegisterFail(error))
            })

    }
}

const onChangeRoleUser = (role) =>{
    return {
        type: actionsType.register.changeRoleUser,
        role: role
    }
}

const changeRoleUser =(isCheck,roleChange)=>{
    return (dispatch,getState) =>{
        const {role} = getState().register
        const role_set=new Set([...role])
        if (isCheck) {
            role_set.add(roleChange)            
        }
        else {
            role_set.delete(roleChange)
        }
        dispatch(onChangeRoleUser([...role_set]))
    }
}

export { onChangeText, onPressRegister, changeRoleUser}
