import { actionsType } from "../../globals/constants"

const storeAuthentication = (data) =>{
    return {
        type: actionsType.auth.storeAuthentication,
        username: data.username,
        token: data.accessToken
    }
}

export { storeAuthentication }