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
const searchItemByImage=(auth,item)=>new Promise((resolve,reject)=>{
    resolve(list)

    // const axiosGetListImage = axiosImage(auth)
    // //const stringId = item.name+";"+item.lonngitude+';'+item.latitude+';'+item.numPerson+';'+item.wardId+';'+item.phone
    // const stringId = 'NguyenHien;10;11;2;32248;123456'
    
    // const uri = item.image  //item.image.slice(0,7)+item.image.slice(8)
    // const nameImage = uri.split("/").pop()
    // const type = `image/${nameImage.substring(nameImage.length-3)}`

    // const data = new FormData();
    // data.append('image',{
    //     uri:uri,
    //     name:nameImage,
    //     type:type
    // })
    
    // axiosGetListImage.get(`${app.apiImage.user.searchImage}${stringId}`,data).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error.response)
    // })
})

export { getListImage,searchItemByImage }