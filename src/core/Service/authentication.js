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

const loginFail = (error) => {
    //console.log(error.message)
    //Alert.alert('Error',`${error.message}`)
}

const loginSuccess = (data, storeAuth, didLogin) => {
    storeAuth(data)
    didLogin()
}

const isValidToken = (auth) => new Promise((resolve, reject) => {
    resolve()
    // const axiosCheckAuth = axiosWithToken(auth)
    // setTimeout(() => {
    //     axiosCheckAuth.get(`${app.api.user.getInfo}${auth.username}`, { timeout: 3000 })
    //         .then((response) => {
    //             resolve(response.status)
    //         })
    //         .catch((error) => {
    //             error.response ?
    //                 reject({ status: error.response.status, error: error.response.data }) :
    //                 reject({ status: 400, error: { message: error.toString() } })
    //         })
    //     }, 0)
})

export { checkStatus, loginFail, loginSuccess, isValidToken }