import axios from "axios"
import { getWardIdByName } from "./location"

const params = {
    access_token: "pk.eyJ1IjoidGhpZW5hbjIxMiIsImEiOiJja3F0eDRtdW0wMmRyMnVvMzltbG83NDkzIn0.qA-0GYbv-d_H2p00TLNC6Q",
    autocomplete: true,
    country: "vn",
    types: "country,region,district,locality",
    language: "vi",
}
const root = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

const searchCenterLocation = (text) => new Promise((resolve, reject) => {
    axios.get(`${root}${text}.json`, { params: params })
        .then((response) => {
            resolve(response.data.features[0].center)
        }).catch((error) => {
            error.response ?
                reject(error.response) :
                reject({ message: error })
        })
})

const getWardIdOfLocation = (location) => new Promise((resolve, reject) => {
    axios.get(`${root}${location.longitude},${location.latitude}.json`, {
        params: params
    }).then((response) => {
        const stringName = response.data.features[0].place_name
        const arrayName = stringName.split(', ')
        const wardId = getWardIdByName([...arrayName])

        if (wardId) {
            resolve(wardId)
        } else {
            reject({ message: 'không thấy được xã' })
        }

    }).catch((error) => {
        error.response ?
            reject(error.respone) :
            reject({ message: error })
    })
})

const getArrayHintsFromText = (text) => new Promise((resolve, reject) => {
    axios.get(`${root}${text}.json`, { params: params }).then((result) => {
        resolve(result.data.features)
    }).catch((error) => {
        error.response ?
            reject(error.response) :
            reject({ message: error })
    })
})

export { searchCenterLocation, getWardIdOfLocation, getArrayHintsFromText }