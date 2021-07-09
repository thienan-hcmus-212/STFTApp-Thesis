import { actionsType, app, regexTypes } from '../../globals/constants'
import axios from 'axios'
import { axiosNoToken } from '../../api/api'

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

    

    if (error?.data?.errors){
        const e = error?.data?.errors[0]
        error.data.message = e.field + " " + e.defaultMessage
    } else {
        switch (error?.data?.message){
            case "Error: Username is already taken!":
                error.data.message = "Tên đăng nhập đã tồn tại, phiền bạn sử dụng tên khác"
                break;
            case "Error: Email is already in use!":
                error.data.message = "Email đã được đăng kí"
                break;
        }
    }

    

    return {
        type: actionsType.register.registerFail, 
        error: error.data || {message: error.toString()}, 
        status: error.status || 400 
    }
}

const filterError = (info) =>{
    console.log(info)
    if (info.password!=info.passwordConfirm) return "Mật khẩu nhập lại không khớp"
    if (!regexTypes.phone.regex.test(info.phone)) return regexTypes.phone.messageErr
    if (!regexTypes.email.regex.test(info.email)) return regexTypes.email.messageErr
    if (!regexTypes.username.regex.test(info.username)) return regexTypes.username.messageErr
    if (!regexTypes.password.regex.test(info.password)) return regexTypes.password.messageErr
    return ""
}

const onPressRegister = () =>{

    const authAxios = axiosNoToken

    return (dispatch, getState) => {

        const { username, password , phone, email, firstname, lastname, role } = getState().register

        dispatch({ type: actionsType.register.registerStart })

        if (username && password && phone && email && firstname && lastname && (role.length>0)){

            const error = filterError(getState().register) 

            if (error){
                dispatch(onRegisterFail(error))
            } else {
                authAxios.post(`${app.api.signup}`, {
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
                    console.log(error.response)
                        error.response?
                            dispatch(onRegisterFail(error.response)):
                            dispatch(onRegisterFail(error))
                    })
            }
        } else {
            dispatch(onRegisterFail("Bạn chưa nhập hết các trường"))
        }

        

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
