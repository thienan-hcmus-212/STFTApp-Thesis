import { actionsType, app } from '../../globals/constants'
import { getList, getNearUser, saveDestination, sendCommitJourneyList } from '../Service/rescue'

import { getDistance } from 'geolib'
import { getDirectionList } from '../Service/map-direction'

const setRescueUnit = (t, type) => {
    return {
        type: type,
        t: t
    }
}



const setList = (auth) => {

    return (dispatch, getState) => {
        getList(auth).then((list) => {
            dispatch(setRescueUnit(list, actionsType.rescue.setListVictim))
        }).catch((error) => {

        })
    }
}

const addRefIndexToItem = (id, index) => {
    return {
        id: id,
        indexRef: index,
        type: actionsType.rescue.addRefIndexToItem
    }

}



const refreshGo = () => {
    return {
        type: actionsType.rescue.refreshGo
    }

}


const refreshTrip = () => {
    return (dispatch, getState) => {

        //reset boardSize
        const { auth } = getState()
        const { boardSize } = getState().rescue
        const { destinationList } = getState().rescue.go
        let size = 0
        destinationList.map((item) => {
            size = size + item.numPerson
            return item
        })
        dispatch(setRescueUnit(boardSize + size, actionsType.rescue.setBoardSize))

        //reset listVictim
        dispatch(setList(auth))

        //reset closer List Victim
        dispatch(setRescueUnit([], actionsType.rescue.setCloserListVictim))

        //refresh go
        dispatch(refreshGo())
    }
}

const setDestinationList = (list) => {
    return (dispatch, getState) => {

        const startLocation = getState().rescue.go.startLocation
        dispatch(setRescueUnit(list, actionsType.rescue.setDestinationList))

        const listLocation = [startLocation, ...list].map((item) => {
            return {
                longitude: item.longitude,
                latitude: item.latitude
            }
        })
        getDirectionList(listLocation).then((array) => {
            dispatch(setRescueUnit(array, actionsType.rescue.setRouteToDestinationList))
        }).catch((error) => {
            console.log(error)
        })
    }
}

const storeJourney = (item) => {
    return {
        type: actionsType.rescue.addItemToMemory,
        item: item
    }
}

const get1Destination = (userLocation, item) => {

    return (dispatch, getState) => {
        const { destinationList,destinationItem, startLocation, routeToDestinationList, listTrace } = getState().rescue.go
        const { boardSize } = getState().rescue
        
        const check= item.id == destinationItem.id
    
        if (check){
            const itemStore = {
                destinationItem: { ...destinationItem },
                listTrace: [...listTrace],
                startLocation: startLocation
            }
            dispatch(storeJourney(itemStore))
    
    
    
            //modify boardSize
            dispatch(setRescueUnit(boardSize + destinationItem.numPerson, actionsType.rescue.setBoardSize))
    
            //modify startLocation
            dispatch(setRescueUnit(userLocation, actionsType.rescue.setStartLocation)) // listTrace will be reset
    
            //modify route
            let index = -1
            let minDistance = getDistance(startLocation, destinationItem)
            routeToDestinationList.map((item, i) => {
    
                const loca = {
                    longitude: item[0],
                    latitude: item[1]
                }
                const distance = getDistance(userLocation, loca)
                if (distance < minDistance) {
                    minDistance = distance
                    index = i
                }
    
                return item
            })
            const newRoute = routeToDestinationList.slice(index)
            dispatch(setRescueUnit(newRoute, actionsType.rescue.setRouteToDestinationList))
    
            //modify destinationList .... destinationItem will be reset
            const newDesList = destinationList.slice(1)
            dispatch(setRescueUnit(newDesList, actionsType.rescue.setDestinationList))
    
            //modify listVictim
            dispatch(setRescueUnit([...newDesList], actionsType.rescue.setListVictim))

        }

    }
}

const deleteItemFromMemory = (item) => {
    return {
        type: actionsType.rescue.removeItemToMemory,
        item: item
    }
}

const sendJourneyToServer = (auth) => {
    return (dispatch, getState) => {
        const memoryClear = getState().rescue.memory.isClear
        if (!memoryClear) {
            const array = getState().rescue.memory.array

            array.map((item) => {

                saveDestination(item.destinationItem, auth).then(() => {
                    dispatch(deleteItemFromMemory(item))
                }).catch(() => {

                })
            })
        }
    }
}

const setLaterForItemOfDestinationList = (id)=>{
    return {
        type : actionsType.rescue.setLaterForItemOfDestinationList,
        id: id
    }
}

const getCloserListVictim = (auth)=>{
    return (dispatch,getState)=>{
        const {closerListVictim} = getState().rescue
        sendCommitJourneyList([],closerListVictim,auth).then(()=>{
            getNearUser(auth).then((data)=>{
                dispatch(setRescueUnit(data,actionsType.rescue.setCloserListVictim))
            }).catch((error)=>{
                console.log(error.response)
            })
        }).catch((error)=>{
            console.log(error.response)
        })
    }
}


export {  getCloserListVictim , setRescueUnit, setList, addRefIndexToItem, refreshTrip, setDestinationList, get1Destination, sendJourneyToServer, setLaterForItemOfDestinationList }