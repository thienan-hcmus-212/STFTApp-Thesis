import * as Location from 'expo-location'
import { getDistance } from 'geolib'
import local from './insert_data.json'

const data = {
    huyen: local.quan.map((item)=> {
        return {
        name: item[1],
        id: item[0],
        idTinh: item[3]
        }
    }),
    xa: local.xa.map((item)=>{
        return {
            name: item[1],
            id: item[0],
            idHuyen: item[3]
        }
    }),
    tinh: local.tinh.map((item)=>{
        return {
            name: item[1],
            id: item[0]
        }
    }) 
}

const findXa= (wardId)=>{
    const xa=data.xa.find(e=>e.id==wardId)
    return xa
}

const findHuyen=(wardId) =>{
    const xa=findXa(wardId)
    const huyen=data.huyen.find(e=>e.id==xa.idHuyen)
    return huyen
}

const findTinh=(wardId) =>{
    const huyen = findHuyen(wardId)
    const tinh = data.tinh.find((e)=>e.id==huyen.idTinh)
    return tinh
}

const getNameLocation = (wardId) => {
    if (!wardId) return {
        tinh: "Bình Dương",
        huyen: "Thuận An",
        xa: "Lái Thiêu",
        listTinh: [{ label: "Bình Dương", value: "Bình Dương" }],
        listHuyen: [{ label: "Thuận An", value: "Thuận An" }],
        listXa: [{ label: "Lái Thiêu", value: "Lái Thiêu" }]
    }
    const tinh = findTinh(wardId)
    const huyen = findHuyen(wardId)
    const xa = findXa(wardId)
    return {
        tinh: tinh.name,
        huyen: huyen.name,
        xa: xa.name,
        listTinh: [{ label: tinh.name, value: tinh.name }],
        listHuyen: [{ label: huyen.name, value: huyen.name }],
        listXa: [{ label: xa.name, value: xa.name }]
    }
}

const getListTinh = () => {
    return data.tinh.map((e)=>{
            return {
                label: e.name,
                value: e.id
            }
        })
}

const getListHuyen = (id) => {
    return data.huyen.filter((e)=>e.idTinh==id).map((e)=>{
        return {
            label: e.name,
            value: e.id
        }
    })

}

const getListXa = (id) => {
    return data.xa.filter((e)=>e.idHuyen==id).map((e)=>{
        return {
            label: e.name,
            value: e.id
        }
    })
}

const getBaseRegion = (wardId) => {
    return {
        longitude: 106.6818088,
        latitude: 10.7622818,
    }
}

const errorLocation={
    noPermissions:"I need your permission to work",
    locationWrong:'something wrong in current location'
}

const getCurrentLocation = () => new Promise((resolve,reject)=>{
    
    const request = new Promise((res,rej)=>{
        Location.requestForegroundPermissionsAsync().then((status)=>{
            (status.status!=='granted')? rej(errorLocation.noPermissions) : res()
        }).catch((e)=>{
            rej(e)
        })
    })
    
    request.then(()=>{
        Location.getCurrentPositionAsync().then((location)=>{
            resolve(location)
        }).catch((e)=>{
            reject(e)
        })

    }).catch((e)=>{
        reject(e)
    })

})

const getMinDistanceToGetItemOfList = (userLocation,destinationList)=>{
    let minItem = destinationList[0]
    let minDistance = getDistance(userLocation,destinationList[0])
    destinationList.map((item)=>{
        const distance = getDistance(userLocation,item)
        minItem = minDistance>distance? item : minItem
        minDistance = minDistance>distance? distance: minDistance
    })

    return { minItem, minDistance }
}
export { getNameLocation, getListHuyen, getListTinh, getListXa,getBaseRegion , getCurrentLocation, getMinDistanceToGetItemOfList}