import axios from "axios"

const token = "pk.eyJ1IjoidGhpZW5hbjIxMiIsImEiOiJja3BmenpnYncyY2Y1MzFueGlxMTBvamR2In0.i9YGIWK_u8W8i-xS9-Rfjg"
const url = (one,two) =>{
    return `https://api.mapbox.com/directions/v5/mapbox/walking/${one.longitude}%2C${one.latitude}%3B${two.longitude}%2C${two.latitude}`
}

const getDirectionTwoPoint = (one,two) => new Promise((resolve,reject) => {
    axios.get(url(one,two),{
        params:{
            alternatives: true,
            geometries: "geojson",
            steps: true,
            access_token: token
        }
    }).then((response)=>{
        const direction = response.data.routes[0].geometry.coordinates
        resolve(direction)
    }).catch((error)=>{
        if (error.response){
            reject(error.response)
        }
        reject({status: 400, message: error})
    })
})

export { getDirectionTwoPoint }