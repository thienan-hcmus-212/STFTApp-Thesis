import { actionsType } from "../../globals/constants"

const initAuth = {
    username: "",
    token: ""
}

const authenticationReducer = (state=initAuth,action) =>{
    switch(action.type){
        case actionsType.auth.storeAuthentication:
            return {
                username: action.username,
                token: action.token
            }
        case actionsType.auth.deleteToken:
            return {
                ...initAuth
            }
    }
    return state
}

export default authenticationReducer