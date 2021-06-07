import axios from "axios"

const token = "pk.eyJ1IjoidGhpZW5hbjIxMiIsImEiOiJja3BmenpnYncyY2Y1MzFueGlxMTBvamR2In0.i9YGIWK_u8W8i-xS9-Rfjg"
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
        console.log(response.data.routes)
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