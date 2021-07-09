import axios from "axios"

const token = "pk.eyJ1IjoidGhpZW5hbjIxMiIsImEiOiJja3F0eDRtdW0wMmRyMnVvMzltbG83NDkzIn0.qA-0GYbv-d_H2p00TLNC6Q"
const url = (array) =>{
    let root ='https://api.mapbox.com/directions/v5/mapbox/walking/'
    array.map((item)=>{
        root=root+`${item.longitude}%2C${item.latitude}%3B`
        return item
    })
    root=root.substring(0,root.length-3)
    return root
}

const getDirectionList = (arrayList) => new Promise((resolve,reject) => {
    axios.get(url(arrayList),{
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

export { getDirectionList }