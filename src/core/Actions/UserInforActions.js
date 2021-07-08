import { actionsType } from "../../globals/constants"
import { changeUserInfo } from "../Service/authentication"

const setUnit = (t,type)=>{
    return {
        t: t,
        type: type
    }
}
const setAllInfo = (item)=>{
    return {
        type: actionsType.userinfo.setAllInfo,
        item: item
    }
}


export { setUnit,setAllInfo }