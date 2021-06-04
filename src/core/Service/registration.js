import { axiosWithToken } from '../../api/api'
import { app } from '../../globals/constants'

const getListRegistration = (auth) => new Promise((resolve, reject) => {
    const axiosGetList = axiosWithToken(auth)
    axiosGetList.get(`${app.api.user.getRegistration}`, { timeout: 3000 }).then((result) => {
        resolve(result.data.data)
    }).catch((error) => {
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
        resolve(result.status)
    }).catch((error)=>{
        error.response?
            reject(error.response):
            reject({status: 400, message: error.message})
    })
})

export { getListRegistration , addItemToListRegistration}