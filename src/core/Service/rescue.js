import { axiosWithToken, rescuerStartRescue } from "../../api/api"
import { app } from "../../globals/constants"

const startRescue = (auth,location,boardSize) => new Promise((resolve,reject)=>{
    resolve()
    // const axiosStart = axiosWithToken(auth)
    // axiosStart.post(rescuerStartRescue(location,boardSize)).then((response)=>{
    //     resolve()
    // }).catch((error)=>{
    //     if (error.response){
    //         reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})
const stopRescue =(auth)=> new Promise((resolve,reject)=>{
    resolve()
    // const axiosStop = axiosWithToken(auth)
    // axiosStop.post(app.api.rescuer.stop).then((response)=>{
    //     resolve()
    // }).catch((error)=>{
    //     if (error.response){
    //         reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})
const sendLocation=(location,auth)=>new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(),100)
    // const axiosSendGPS = axiosWithToken(auth)
    // axiosSendGPS.post(app.api.rescuer.sendGPS,null,{ params:{
    //     longitude: location.longitude,
    //     latitude: location.latitude
    // }}).then((response)=>{
    //     resolve()
    // }).catch((error)=>{
    //     if (error.response){
    //         reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})

const listL = [
    {
        id: 12,
        name: "thien an ly",
        longitude: 106.6957936,
        latitude: 10.7673912,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0987456321",
        numPerson: 3,
        eState: "STATE_EMERGENCY"
    },
    {
        id: 5,
        name: "xuan vy nguyen",
        longitude: 106.671,
        latitude: 10.764,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0935624754",
        numPerson: 0,
        eState: "STATE_EMERGENCY"
    },
    {
        id: 6,
        name: "nguyen ba kha",
        longitude: 106.681,
        latitude: 10.744,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0935624754",
        numPerson: 0,
        eState: "STATE_DANGER"
    },
    {
        id: 7,
        name: "Tran Phuong Linh",
        longitude: 106.691,
        latitude: 10.734,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0935624755",
        numPerson: 0,
        eState: "STATE_SAVED"
    },
    {
        id: 8,
        name: "Tran Phuong Linh So 2",
        longitude: 106.69,
        latitude: 10.73,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0935624755",
        numPerson: 0,
        eState: "STATE_UNAUTHENTICATED"
    },
    {
        id: 9,
        name: "Dang Tan Tai",
        longitude: 106.695,
        latitude: 10.735,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0935624755",
        numPerson: 0,
        eState: "STATE_EMERGENCY"
    },
    {
        id: 10,
        name: "Le Thuy Hai",
        longitude: 106.679,
        latitude: 10.762,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0935623455",
        numPerson: 0,
        eState: "STATE_SAVED"
    }
]

const getList=(auth)=>new Promise((resolve,reject)=>{
    resolve(listL)
    
    // const axiosGetList = axiosWithToken(auth)
    // axiosGetList.get(app.api.rescuer.getList).then((response)=>{
    //     console.log(response.data.data)
    //     resolve(response.data.data)
    // }).catch((error)=>{
    //     console.log(error.response)
    //     if (error.response){
    //         reject(error.response.data)
    //     }
    //     reject({status: 400, message: error})
    // })
})


export { startRescue, stopRescue, sendLocation, getList}