import axios from 'axios'
import { app } from '../globals/constants'

const axiosWithToken = (auth) => axios.create({
    baseURL: app.api.root,
    headers: {
        Authorization: auth.token
    }
})

const axiosNoToken = axios.create({
    baseURL: app.api.root,
    headers: {

    }
})

const rescuerRegisterLocation = (wardId) =>{
    return app.api.rescuer.registerLocation+`${wardId}?eRole=ROLE_RESCUER`
}
const rescuerStartRescue = (location,boardSize) =>{
    return app.api.rescuer.startRescue+`longitude=${location.longitude}&latitude=${location.latitude}&boardSize=${boardSize}`
}


export { axiosNoToken, axiosWithToken , rescuerRegisterLocation, rescuerStartRescue}