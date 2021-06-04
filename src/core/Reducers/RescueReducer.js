import { actionsType } from "../../globals/constants"

const initRescue= {
    userLocation: {
        longitude: 106.6839969,
        latitude: 10.7636702,
    },
    boardSize: 1,
    listRefItem: [],
    listVictim: [],
    closerListVictim: [],
    go:{
        selectItem: null,
        destinationItem: null,
        startLocation: null,
        destinationList: [],
        routeToDestinationList: []
    }
}
const initGo = {
    destinationItem: null,
    startLocation: null,
    destinationList: [],
    routeToDestinationList: []
}

const RescueReducer = (state=initRescue,action) =>{
    switch (action.type){
        case actionsType.rescue.setUserLocation: 
            return {
                ...state,
                userLocation: action.t
            }
        case actionsType.rescue.setBoardSize:
            return {
                ...state,
                boardSize: action.t
            }
        case actionsType.rescue.setListVictim: 
            return {
                ...state,
                listVictim: action.t
            }
        case actionsType.rescue.setCloserListVictim:
            return{
                ...state,
                closerListVictim: action.t
            }
        case actionsType.rescue.addRefIndexToItem:
            return {
                ...state,
                listRefItem: [...state.listRefItem,{id: action.id, indexRef:action.indexRef}]
            }
        case actionsType.rescue.setDestinationList:
            return {
                ...state,
                go:{
                    ...state.go,
                    destinationList: action.t,
                    destinationItem: action.t[0],
                }
            }
        case actionsType.rescue.setStartLocation:
            return {
                ...state,
                go:{
                    ...state.go,
                    startLocation: action.t
                }
            }
        case actionsType.rescue.setSelectItem:
            return {
                ...state,
                go:{
                    ...state.go,
                    selectItem: action.t
                }
            }
        case actionsType.rescue.refreshGo:
            return {
                ...state,
                go: {
                    ...state.go,
                    ...initGo
                }
            }
        case actionsType.rescue.setRouteToDestinationList:
            return {
                ...state,
                go:{
                    ...state.go,
                    routeToDestinationList: action.t
                }
            }
    }
    return state
}

export default RescueReducer