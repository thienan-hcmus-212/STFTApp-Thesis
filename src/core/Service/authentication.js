import axios from "axios"
import { axiosWithToken } from "../../api/api"
import { app } from "../../globals/constants"

const checkStatus = (status) => {
    switch (status) {
        case 200:
            return true
    }
    return false
}

const isValidToken = (auth) => new Promise((resolve, reject) => {
    //setTimeout(()=>reject(),1000)
    //resolve(changeRole(userInfor).roles)
    const axiosCheckAuth = axiosWithToken(auth)
    axiosCheckAuth.get(`${app.api.user.getInfo}${auth.username}`, { timeout: 3000 })
        .then((response) => {
            resolve(changeRole(response.data.data).roles)
        })
        .catch((error) => {
            error.response ?
                reject({ status: error.response.status, error: error.response.data }) :
                reject({ status: 400, error: { message: error.toString() } })
        })
})
const userInfor = {
    "username": "xuanvy1",
    "firstname": "vy",
    "lastname": "nguyen xuan",
    "phone": "0935624754",
    "email": "xuanvy12345678@gmail.com",
    "roles": [
        {
            "id": 3,
            "name": "ROLE_RESCUER"
        },
        {
            "id": 4,
            "name": "ROLE_USER"
        }
    ]
}

const changeRole = (item)=>{
    let newRole = {}
    item.roles.map((i)=>{
        if (i.name.toLowerCase()==app.role.user)
            newRole={
                ...newRole,
                user: true
            }
        if (i.name.toLowerCase()==app.role.rescuer)
            newRole={
                ...newRole,
                rescuer: true
            }
    })
    return {
        ...item,
        roles: newRole
    }
}
const getInfo = (auth)=> new Promise((resolve,reject)=>{

    //resolve(changeRole(userInfor))
    const axiosGetInfo = axiosWithToken(auth)
    axiosGetInfo.get(`${app.api.user.getInfo}${auth.username}`, { timeout: 3000 })
    .then((response)=>{
        resolve(changeRole(response.data.data))
    }).catch((error)=>{
        error.response ?
            reject({ status: error.response.status, error: error.response.data }) :
            reject({ status: 400, error: { message: error.toString() } })
    })
})

const changeUserInfo = (auth,item)=>new Promise((resolve,reject)=>{
    const axiosChange = axiosWithToken(auth)
    axiosChange.post(`${app.api.user.getInfo}${auth.username}`,{
        username:"123456789",
        firstname: item.firstname,
        lastname: item.lastname,
        phone: item.phone,
        email: item.email,
        role:[],
        password: "12345689"
    }).then((response)=>{
        resolve()
    }).catch((error)=>{
        console.log(error.response)
        error.response ?
            reject(error.response.data) :
            reject({ status: 400, error: { message: error.toString() } })
    })
})

export { checkStatus, isValidToken, getInfo, changeUserInfo, changeRole }