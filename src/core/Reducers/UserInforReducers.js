import { actionsType } from "../../globals/constants"

const initInfor = {
    username:'',
    email:'',
    phone:'',
    firstname:'',
    lastname:'',
    roles:{}
}

const UserInformationReducer = (state=initInfor,action) => {
    switch (action.type){
        case actionsType.userinfo.setEmail:
            return {
                ...state,
                email: action.t
            }
        case actionsType.userinfo.setFirstName:
            return {
                ...state,
                firstname: action.t
            }
        case actionsType.userinfo.setPhone:
            return {
                ...state,
                phone: action.t
            }
        case actionsType.userinfo.setLastName:
            return {
                ...state,
                lastname: action.t
            }
        case actionsType.userinfo.setAllInfo:
            return {
                username: action.item.username,
                firstname: action.item.firstname,
                lastname: action.item.lastname,
                phone: action.item.phone,
                email: action.item.email,
                roles: action.item.roles
            }
    }
    return state
}

export default UserInformationReducer