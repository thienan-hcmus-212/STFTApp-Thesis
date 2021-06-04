import { axiosNoToken, axiosWithToken, rescuerRegisterLocation } from "../../api/api"
import { app } from "../../globals/constants"


const getWardIdRegistration=(auth) => new Promise((resolve,reject)=>{
    reject()
    // const axiosGetRegis = axiosWithToken(auth)
    // axiosGetRegis.get(app.api.rescuer.getRegistration).then((result)=>{
    //     resolve(result.data.data.locationId)
    // }).catch((error)=>{
    //     if (error.response){
    //         reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})

const registerWardId = (auth,wardId) => new Promise((resolve,reject)=>{
    resolve()
    // const axiosRegisterWardId = axiosWithToken(auth)
    // axiosRegisterWardId.post(rescuerRegisterLocation(wardId)).then((response)=>{
    //     resolve()
    // }).catch((error)=>{
    //     if (error.response){
    //         error.response.data.message == "you had another request in queue,please delete it before create new one!"?
    //             resolve():
    //             reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})

const deleteRegistration = (auth,wardId) => new Promise((resolve,reject)=>{
    resolve()
    // const axiosDeleteRegis = axiosWithToken(auth)
    // axiosDeleteRegis.delete(rescuerRegisterLocation(wardId)).then((response)=>{
    //     resolve()
    // }).catch((error)=>{
        
    //     if (error.response){
    //         reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})

const checkIsAccept = (auth) => new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(true),1000)

    // const axiosGetRegis= axiosWithToken(auth)
    // axiosGetRegis.get(app.api.rescuer.getRegistration).then((result)=>{
    //     (result.data.data.estate=='STATE_UNAUTHENTICATED')?
    //         resolve(false):
    //         resolve(true)
    // }).catch((error)=>{
    //     if (error.response){
    //         reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})


export { getWardIdRegistration,registerWardId,deleteRegistration, checkIsAccept }