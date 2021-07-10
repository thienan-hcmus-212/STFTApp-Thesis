import { axiosWithToken } from '../../api/api'
import { app } from '../../globals/constants'

const getListRegistration = (auth) => new Promise((resolve, reject) => {
    const axiosGetList = axiosWithToken(auth)
    axiosGetList.get(`${app.api.user.getRegistration}`).then((result) => {
        const data=result.data.data[0]
        const follow=result.data.data[1]
        follow.map((item)=>{
            const check = data.find((i)=>{
                return i.id==item.id
            })
            check?null:data.push(item)
        })
        resolve(data)
    }).catch((error) => {
        console.log(error.response)
        error.response ?
            reject(error.response) :
            reject({ status: 400, message: error.message })
    })
})

const addItemToListRegistration = (auth, item) => new Promise((resolve, reject) => {
    const axiosPostItem = axiosWithToken(auth)
    axiosPostItem.post(`${app.api.user.postRegistration}`, {
        name: item.name,
        longitude: item.longitude,
        latitude: item.latitude,
        phone: item.phone,
        numPerson: item.numPerson,
        wardId: item.wardId
    }).then((result)=>{
        resolve(result)
    }).catch((error)=>{
        error.response?
            reject(error.response):
            reject({status: 400, message: error.message})
    })
})

const followRegistration = (auth,item)=> new Promise((res,rej)=>{
    const axiosFollow = axiosWithToken(auth)
    axiosFollow.post(`${app.api.user.followRegistration}`,null,{
        params:{
            registrationId: item.id
    }}).then((response)=>{
        res()
    }).catch((error)=>{
        error.response?
            rej(error.response.data):
            rej({status: 400, message: error.message})
    })
})

const deleteRegistration = (auth,item)=>new Promise((resolve,reject)=>{
    const axiosDelete = axiosWithToken(auth)
    axiosDelete.delete(`${app.api.user.getRegistration}`,{
        params:{
            registrationId: item.id
        }
    }).then((response)=>{
        resolve()
    }).catch((error)=>{
        error.response?
            reject(error.response.data):
            reject({status: 400, message: error.message})
    })
})

export { getListRegistration , addItemToListRegistration, followRegistration, deleteRegistration}