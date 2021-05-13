import { actionsType } from "../../globals/constants"


const setInfoARegistration = (t, type) => {
    return {
        type: type,
        t: t
    }
}

const setInfoOfItem = (item) => {

    return (dispatch, getState) => {
        const { name, image, longitude, latitude, wardId, numPerson, phone } = item

        dispatch(setInfoARegistration(image, actionsType.registration.setImage))
        dispatch(setInfoARegistration(wardId, actionsType.registration.setWardId))

        dispatch(setInfoARegistration(name, actionsType.registration.setName))
        dispatch(setInfoARegistration(longitude, actionsType.registration.setLongitude))
        dispatch(setInfoARegistration(latitude, actionsType.registration.setLatitude))
        dispatch(setInfoARegistration(numPerson, actionsType.registration.setNumPerson))
        dispatch(setInfoARegistration(phone, actionsType.registration.setPhone))
    }
}

const setList = (list)=>{
    return{
        type: actionsType.registration.setListData,
        list: list
    }
}

const deleteItemList = (item) => {

    return (dispatch,getState) =>{
        const newList = [...getState().registration.registrationList].filter((i)=>i.key!=item.key)
        dispatch(setList(newList))
    }


}

const startFetchingRegistrationList=()=>{
    return {
        type: actionsType.registration.setLoadingListTrue
    }
}

const finishFetchingRegistrationList=()=>{
    return {
        type: actionsType.registration.setLoadingListFalse
    }
}

const Data = [{
    key: '0',
    image: "https://i.ibb.co/wr3N7qN/test.jpg",

    name: "xuan vy nguyen",
    longitude: 106.6818088,
    latitude: 10.7622818,
    wardId: "32248",
    phone: "0935624754",
    numPerson: 3
},
{
    key: '1',
    image: "https://i.ibb.co/wr3N7qN/test.jpg",

    name: "xuanvy nguyen",
    longitude: 100.1,
    latitude: 10.2,
    wardId: "32248",
    phone: "0935624754",
    numPerson: 3
},
{
    key: '3',
    image: "https://i.ibb.co/wr3N7qN/test.jpg",

    name: "xuan nguyen",
    longitude: 100.1,
    latitude: 10.2,
    wardId: "32248",
    phone: "0935624754",
    numPerson: 3
},
{
    key: '4',
    image: "https://i.ibb.co/wr3N7qN/test.jpg",

    name: "xuan vy",
    longitude: 100.1,
    latitude: 10.2,
    wardId: "32248",
    phone: "0935624754",
    numPerson: 3
}
]
const fetchingRegistrationList=()=>{

    return (dispatch,getState)=>{
        dispatch(startFetchingRegistrationList())
        setTimeout(()=>{
            dispatch(setList(Data))
            dispatch(finishFetchingRegistrationList())
        },0)
    }

}


export { setInfoARegistration, setInfoOfItem, deleteItemList, fetchingRegistrationList }