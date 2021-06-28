import { actionsType } from "../../globals/constants"

const initRescue= {
    userLocation: {
        latitude: 10.7675185,
        longitude: 106.691865
    },
    boardSize: 9,
    listRefItem: [],
    listVictim: [],
    closerListVictim: [],
    isGo: false,
    go:{
        selectItem: null,
        destinationItem: null,
        startLocation: null,
        destinationList: [],
        routeToDestinationList: [],
        listTrace: [],
        rotateDegUser: 315,
    },
    memory:{
        isClear: true,
        array: []
    }
}
const initMemory= {
    isClear: true,
    array: []
}
const objectInArrayOfMemory={
    destinationItem:null,
    startLocation:null,
    listTrace:[]
}
const initGo = {
    destinationItem: null,
    startLocation: null,
    destinationList: [],
    routeToDestinationList: [],
    selectItem: null,
    listTrace: [],
    rotateDegUser: 315,
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
                boardSize: (action.t>0)?action.t:0
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
                    destinationItem: (action.t.length>0)?action.t[0]:null,
                }
            }
        case actionsType.rescue.setStartLocation:
            return {
                ...state,
                go:{
                    ...state.go,
                    startLocation: action.t,
                    listTrace: [action.t]
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
                isGo: false,
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
        case actionsType.rescue.setGobutton:
            return {
                ...state,
                isGo: action.t,
                go: action.t?{
                        ...state.go,
                        listTrace: state.go.listTrace?[state.userLocation]:state.go.listTrace,
                        startLocation: state.go.startLocation?state.userLocation:state.go.startLocation,
                    }:{
                        ...initGo
                    }
            }
        case actionsType.rescue.setListTrace:
            return {
                ...state,
                go:{
                    ...state.go,
                    listTrace: action.t
                }
            }
        case actionsType.rescue.setRotateDegUser:
            return {
                ...state,
                go:{
                    ...state.go,
                    rotateDegUser: (action.t<0)?action.t+360:(action.t>360?action.t-360:action.t)
                }
            }
        case actionsType.rescue.addItemToMemory:
            return {
                ...state,
                memory:{
                    isClear: false,
                    array: [...state.memory.array,action.item]
                }
            }
        case actionsType.rescue.removeItemToMemory:
            return {
                ...state,
                memory:{
                    array: state.memory.array.filter((item)=>{
                        return (item.destinationItem.id!=action.item.destinationItem.id)
                    }),
                    isClear: (state.memory.array.filter((item)=>{
                        return (item.destinationItem.id!=action.item.destinationItem.id)
                    }).length>0)?false:true
                }
            }
        case actionsType.rescue.setLaterForItemOfDestinationList:
            return {
                ...state,
                go:{
                    ...state.go,
                    destinationList: state.go.destinationList.map((item)=>{
                        if (item.id==action.id){
                            item.later = true
                        }
                        return item
                    })
                }
            }
    }
    return state
}

export default RescueReducer