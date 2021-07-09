import { axiosWithToken, rescuerStartRescue } from "../../api/api"
import { app } from "../../globals/constants"

const startRescue = (auth,location,boardSize) => new Promise((resolve,reject)=>{
    //resolve()
    const axiosStart = axiosWithToken(auth)
    axiosStart.post(rescuerStartRescue(location,boardSize)).then((response)=>{
        resolve()
    }).catch((error)=>{
        if (error.response){
            reject(error.response.data)
        }
        reject({status: 400, message: error})
    })
})
const stopRescue =(auth)=> new Promise((resolve,reject)=>{
    //resolve()
    const axiosStop = axiosWithToken(auth)
    axiosStop.post(app.api.rescuer.stop).then((response)=>{
        resolve()
    }).catch((error)=>{
        if (error.response){
            reject(error.response.data)
        }
        reject({status: 400, message: error})
    })
})
const sendLocation=(location,auth)=>new Promise((resolve,reject)=>{
    //setTimeout(()=>resolve(),100)
    const axiosSendGPS = axiosWithToken(auth)
    axiosSendGPS.post(app.api.rescuer.sendGPS,null,{ params:{
        longitude: location.longitude,
        latitude: location.latitude
    }}).then((response)=>{
        resolve()
    }).catch((error)=>{
        if (error.response){
            reject(error.response.data)
        }
        reject({status: 400, message: error})
    })
})

const listL = [
    {
        id: 12,
        name: "thien an ly",
        longitude: 106.6913848,
        latitude: 10.767572,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0987456321",
        numPerson: 12,
        eState: "STATE_EMERGENCY",
        order: 3
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
        eState: "STATE_EMERGENCY",
        order: 1
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
        eState: "STATE_EMERGENCY",
        order: 2
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
        eState: "STATE_EMERGENCY",
        order: 0
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
        eState: "STATE_EMERGENCY",
        order: 2
    }
]

const getList=(auth)=>new Promise((resolve,reject)=>{
    //resolve(listL)
    
    const axiosGetList = axiosWithToken(auth)
    axiosGetList.get(app.api.rescuer.getList).then((response)=>{
        resolve(response.data.data)
    }).catch((error)=>{
        console.log(error.response)
        if (error.response){
            reject(error.response.data)
        }
        reject({status: 400, message: error})
    })
})

const sendCommitJourneyList = (list,listS, auth) => new Promise((resolve, reject)=>{
    //resolve()
    
    let array = []
    listS.map((item)=>{
        const i = list.findIndex((i)=>i.id==item.id)
        if (i==-1) array.push(item.id)
    })
    const axiosDelete=axiosWithToken(auth)
    axiosDelete.delete(`${app.api.rescuer.getList}`,{
        data:{
            registrationIds : array
        }
    }).then((response)=>{
        resolve()
    }).catch((error)=>{
        if (error.response){
            reject(error.response.data)
        }
        reject({status: 400, message: error})
    })
})

const add1CommitToJourneyList = (item,list,auth) => new Promise((resolve,reject)=>{
    console.log(item)
    console.log(list)
    resolve()
})
const remove1CommitfromJourneyList = (item,auth) => new Promise((resolve,reject)=>{
    
    //resolve()
    const axiosDelete=axiosWithToken(auth)
    axiosDelete.delete(`${app.api.rescuer.getList}`,{
        data: {
            registrationIds: [item.id]
        }
    }).then((response)=>{
        resolve()
    }).catch((error)=>{
        if (error.response){
            reject(error.response.data)
        }
        reject({status: 400, message: error})
    })
})

const sendUnCommitJourneyList = (auth) => new Promise((resolve, reject)=>{
    console.log('123456')
    resolve()
})

const saveDestination = (item, auth) => new Promise((resolve,reject)=>{
    //resolve()
    const axiosSave = axiosWithToken(auth)
    axiosSave.post(`${app.api.rescuer.saveDestination}${item.id}`,null,{ params:{
        numPeople: item.numPerson
    }}).then(()=>{
        resolve()
    }).catch(()=>{
        reject()
    })
})


const L=[
    {
        id: 15,
        name: "thien an ly",
        longitude: 106.6913848,
        latitude: 10.767572,
        ward: {
            id: "00571",
            name: "Xã Dương Xá",
            type: "Xã"
        },
        phone: "0987456321",
        numPerson: 12,
        eState: "STATE_EMERGENCY",
        order: 3
    },
]

const getNearUser = (auth) => new Promise((resolve,reject)=>{

    const axiosGetNear = axiosWithToken(auth)

    axiosGetNear.get(`${app.api.rescuer.getListNear}`).then((response)=>{
        resolve(response.data.data)
    }).catch((error)=>{
            if (error.response){
                reject(error.response.data)
            }
            reject({status: 400, message: error})
    })
})




export { getNearUser ,startRescue, stopRescue, sendLocation, getList, sendCommitJourneyList, sendUnCommitJourneyList, saveDestination, add1CommitToJourneyList, remove1CommitfromJourneyList}