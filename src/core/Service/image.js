import { axiosImage } from "../../api/api"
import { app } from "../../globals/constants"
import FormData from "form-data"
import axios from "axios"

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

const list = {
    "differ_point": {
        "0": 374.43290453698114,
        "1": 426.3996366454266,
        "2": 574.4329045369811,
        "3": 2986.4417242047343
    },
    "registrations": {
        "0": {
            "__data__": {
                "id": 1,
                "name": "Nguyễn Hiền",
                "longitude": 1.1,
                "latitude": 1.2,
                "num_person": 0,
                "ward_id": "32248",
                "e_state": 4,
                "saved_by_username": null,
                "create_by_username": "xuanvy1",
                "phone": "0935624754"
            },
            "_dirty": [],
            "__rel__": {}
        },
        "1": {
            "__data__": {
                "id": 2,
                "name": "Nguyễn Hiền",
                "longitude": 1.1,
                "latitude": 1.2,
                "num_person": 0,
                "ward_id": "32248",
                "e_state": 4,
                "saved_by_username": null,
                "create_by_username": "xuanvy1",
                "phone": "0935624754"
            },
            "_dirty": [],
            "__rel__": {}
        },
        "2": {
            "__data__": {
                "id": 3,
                "name": "xuan vy nguyen",
                "longitude": 1.1,
                "latitude": 1.2,
                "num_person": 0,
                "ward_id": "32248",
                "e_state": 4,
                "saved_by_username": null,
                "create_by_username": "xuanvy1",
                "phone": "0935624754"
            },
            "_dirty": [],
            "__rel__": {}
        },
        "3": {
            "__data__": {
                "id": 4,
                "name": "xuan vy nguyen",
                "longitude": 106.678,
                "latitude": 10.763,
                "num_person": 0,
                "ward_id": "32248",
                "e_state": 4,
                "saved_by_username": null,
                "create_by_username": "xuanvy1",
                "phone": "0935624754"
            },
            "_dirty": [],
            "__rel__": {}
        }
    },
    "url_list": {
        "0": "images/1.jpg",
        "1": "images/2.jpg",
        "2": "images/3.jpg",
        "3": "images/4.jpg"
    }
}

const checkOnlyItem = (result,auth)=>{
    const registrations = result.data[0]["registrations"]
    console.log(result.data[0])
    const arrayKey = Object.keys(registrations)
    arrayKey.map((key)=>{
        if (registrations[key]["__data__"]["create_by_username"]==auth.username){
            delete registrations[key]
        }
    })
    return result.data[0]
}

const saveImageToServer = (auth,image,id)=> new Promise((resolve,reject)=>{
    const axiosSaveImage = axiosImage(auth)
    if (!image) resolve({status: 200})
    const uri = image
    const nameImage = uri.split('/').pop()
    const type = `image/${nameImage.substring(nameImage.length-3)}`

    const data= new FormData();
    data.append('image',{
        uri: uri,
        name: nameImage,
        type: type
    })
    axiosSaveImage.post(`${app.apiImage.user.saveImage}${id}`,data).then((result)=>{
        resolve(result.status)
    }).catch((error)=>{
        error.response?
            reject({message: error.response.data.detail}):
            reject({message: error})
    })
})

const searchItemByImage=(auth,item)=>new Promise((resolve,reject)=>{

    const axiosGetListImage = axiosImage(auth)
    const stringId = item.name+";"+item.longitude+';'+item.latitude+';'+item.numPerson+';'+item.wardId+';'+item.phone;
    (item.name && item.latitude && item.longitude && item.numPerson && item.wardId && item.phone )?null:reject({message: "bạn chưa nhập hết các trường bên dưới"})
    if (item.image){
        const uri = item.image
        const nameImage = uri.split("/").pop()
        const type = `image/${nameImage.substring(nameImage.length-3)}`

        const data = new FormData();
        data.append('image',{
            uri:uri,
            name:nameImage,
            type:type
        })

        axiosGetListImage.post(`${app.apiImage.user.searchImage}image/${stringId}`,data).then((result)=>{
            const data = checkOnlyItem(result,auth)
            resolve(data)
        }).catch((error)=>{
            error.response?
                reject({message: error.response.data.detail}):
                reject({message: error})
        })

    } else {

        axiosGetListImage.post(`${app.apiImage.user.searchImage}noImage/${stringId}`).then((result)=>{
            const data = checkOnlyItem(result,auth)
            resolve(data)
        }).catch((error)=>{
            error.response?
                reject({message: error.response.data.detail}):
                reject({message: error})
        })

    }    
})

export { getListImage,searchItemByImage,saveImageToServer }