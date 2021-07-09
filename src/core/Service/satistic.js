import { axiosWithToken } from "../../api/api"
import { app } from "../../globals/constants"

const getListFlood = (auth)=> new Promise((resolve,reject)=>{
    //resolve(["00571", "32248"])
    const axiosGet = axiosWithToken(auth) 
    axiosGet.get(`${app.api.user.getFloodNoti}`).then((response)=>{
        resolve(response.data.data)
    }).catch((error)=>{
        error.response?
            reject(error.response.data):
            reject({message: error})
    })
})

export {getListFlood}