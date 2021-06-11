import { axiosImage } from "../../api/api"
import { app } from "../../globals/constants"

const getListImage = (auth,stringId) => new Promise((resolve,reject)=>{
    const axiosGetImage = axiosImage(auth)
    axiosGetImage.get(`${app.apiImage.user.getListImage}${stringId}`)
        .then((result)=>{
            const data=result.data[0]["regidId-url"]
            resolve(data)
        }).catch((error)=>{
            error.response?
                reject(error.response.data):
                reject({status:400, message: error})
        })
})

export { getListImage }