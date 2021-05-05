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
    }
    return state
}

export default authenticationReducer