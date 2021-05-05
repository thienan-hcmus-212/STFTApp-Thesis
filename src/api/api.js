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

export { axiosNoToken, axiosWithToken }