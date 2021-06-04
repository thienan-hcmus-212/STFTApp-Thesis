import { actionsType } from '../../globals/constants'
import { getList } from '../Service/rescue'

import { getDistance } from 'geolib'

const setRescueUnit = (t,type) =>{
    return {
        type: type,
        t: t
    }
}



const setList = (auth)=>{
    
    return (dispatch,getState) => {
        const userLocation = getState().rescue.userLocation
        getList(auth).then((list)=>{
            const closerList = [...list].filter((item)=>{
                const location = {
                    longitude: item.longitude,
                    latitude: item.latitude
                }
                return (getDistance(userLocation,location) < 1000)
            }).map((item)=>{
                return item.id
            })
            dispatch(setRescueUnit(closerList,actionsType.rescue.setCloserListVictim))
            dispatch(setRescueUnit(list,actionsType.rescue.setListVictim))
        }).catch((error)=>{
            
        })
    }
}

const addRefIndexToItem = (id,index)=>{
    return {
        id: id,
        indexRef: index,
        type: actionsType.rescue.addRefIndexToItem
    }

}

const refreshGo = ()=>{
    return {
        type: actionsType.rescue.refreshGo
    }

}

export { setRescueUnit, setList, addRefIndexToItem, refreshGo }