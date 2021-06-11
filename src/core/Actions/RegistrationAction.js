import { actionsType, app } from "../../globals/constants"
import { getListImage } from "../Service/image"
import { getListRegistration, addItemToListRegistration } from "../Service/registration"


const setInfoARegistration = (t, type) => {
    return {
        type: type,
        t: t
    }
}

const setInfoOfItem = (item) => {

    return (dispatch, getState) => {
        const { name, image, longitude, latitude, ward, numPerson, phone } = item
        dispatch(setInfoARegistration(image, actionsType.registration.setImage))
        dispatch(setInfoARegistration(ward.id, actionsType.registration.setWardId))

        dispatch(setInfoARegistration(name, actionsType.registration.setName))
        dispatch(setInfoARegistration(longitude, actionsType.registration.setLongitude))
        dispatch(setInfoARegistration(latitude, actionsType.registration.setLatitude))
        dispatch(setInfoARegistration(numPerson, actionsType.registration.setNumPerson))
        dispatch(setInfoARegistration(phone, actionsType.registration.setPhone))
    }
}

const setList = (list) => {
    return {
        type: actionsType.registration.setListData,
        list: list
    }
}

const deleteItemList = (item) => {

    return (dispatch, getState) => {
        const newList = [...getState().registration.registrationList].filter((i) => i.id != item.id)
        dispatch(setList(newList))
    }


}

const startFetchingRegistrationList = () => {
    return {
        type: actionsType.registration.setLoadingListTrue
    }
}

const finishFetchingRegistrationList = () => {
    return {
        type: actionsType.registration.setLoadingListFalse
    }
}

const Data = [{
    id: 6,
    name: "xuan vy nguyen",
    longitude: 106.68181,
    latitude: 10.762281,
    ward: {
        id: "32248",
        name: "Xã Đất Mũi",
        type: "Xã"
    },
    phone: "0935624754",
    numPerson: 3,
    savedBy: null,
    createBy: {
        username: "xuanvy1",
        firstname: "vy",
        lastname: "nguyen xuan",
        phone: "0935624754",
        email: "xuanvy12345678@gmail.com",
        roles: [
            {
                id: 2,
                name: "ROLE_AUTHORITY"
            },
            {
                id: 4,
                name: "ROLE_VOLUNTEER"
            },
            {
                id: 1,
                name: "ROLE_USER"
            },
            {
                id: 3,
                name: "ROLE_RESCUER"
            }
        ]
    },
    commentList: [],
    estate: "STATE_UNAUTHENTICATED"
},
{
    id: 1,
    image: "https://i.ibb.co/wr3N7qN/test.jpg",

    name: "xuanvy nguyen",
    longitude: 106.6880955,
    latitude: 10.7571534,
    wardId: "32248",
    phone: "0935624754",
    numPerson: 3
},
{
    id: 3,
    image: "https://i.ibb.co/wr3N7qN/test.jpg",

    name: "xuan nguyen",
    longitude: 106.6880335,
    latitude: 10.7575221,
    wardId: "32248",
    phone: "0935624754",
    numPerson: 3
},
{
    id: 4,
    image: "https://i.ibb.co/wr3N7qN/test.jpg",

    name: "xuan vy",
    longitude: 106.6884135,
    latitude: 10.7588055,
    wardId: "32248",
    phone: "0935624754",
    numPerson: 3
}
]
const fetchingRegistrationList = (auth) => {

    return (dispatch, getState) => {
        // dispatch(startFetchingRegistrationList())
        // setTimeout(() => {
        //     dispatch(setList(Data))
        //     dispatch(finishFetchingRegistrationList())
        // }, 0)


        dispatch(startFetchingRegistrationList())
        getListRegistration(auth).then((result)=>{
            let stringId = ''
            result.map((item)=>{
                stringId = stringId + item.id +'.'
            })
            stringId=stringId.slice(0,stringId.length-1)
            getListImage(auth,stringId).then((listImage)=>{
                const newResult = result.map((item)=>{
                    return {
                        ...item,
                        image: listImage[item.id]?(app.apiImage.root + listImage[item.id]):null
                    }
                })
                dispatch(setList(newResult))
                dispatch(finishFetchingRegistrationList())
            
            }).catch((error)=>{
                dispatch(setErrorStatus(error))
                dispatch(finishFetchingRegistrationList())
            })
        }).catch((error)=>{
            dispatch(setErrorStatus(error))
            dispatch(finishFetchingRegistrationList())
        })
    }

}

const setNullInfo = () => {
    return {
        type: actionsType.registration.setNullInfo
    }
}

const checkPhone = (phone) => {
    const regex = /(84|0[3|5|7|8|9])+([0-9]{8})/g
    return (regex.test(phone)) ? null : "invalid phone"
}
const checkNumPersion = (num) => {
    if (isNaN(num))
        return "must number"

    if (num <= 0 || num > 100)
        return "num thuộc {i| 0<i<100 }"

    return null
}

const checkWardId = (wardId) =>{
    if (!wardId)
        return "bạn phải chọn địa chỉ bên dưới"
    return null
}

const check = (item) => {
    const errorNum = checkNumPersion(item.numPerson)
    const errorPhone = checkPhone(item.phone)
    const errorWardId= checkWardId(item.wardId);

    return { errorNum, errorPhone,errorWardId }
}

const onPressPostRequest = (auth) => {

    return (dispatch, getState) => {

        const item = getState().registration.infoARegistration

        const { errorNum, errorPhone, errorWardId } = check(item)
        if (errorNum || errorPhone || errorWardId) {
            dispatch(setInfoARegistration(errorNum, actionsType.registration.setErrorNumPersion))
            dispatch(setInfoARegistration(errorPhone, actionsType.registration.setErrorPhone))
            dispatch(setInfoARegistration(errorWardId, actionsType.registration.setErrorWardId))
            dispatch(setErrorStatus({status: 400, message: "Lỗi cú pháp"}))
        } else {
            addItemToListRegistration(auth,item).then((status)=>{
                dispatch(setStatus(status))
            }).catch((error)=>{
                console.log(error)
                dispatch(setErrorStatus(error))
            })
        }

    }

}

const setErrorStatus = (error)=>{
    return {
        type: actionsType.registration.setErrorStatus,
        error: error
    }
}
const setStatus = (status) =>{
    return {
        type: actionsType.registration.setStatus,
        status:status
    }
}

export { setInfoARegistration, setInfoOfItem, deleteItemList, fetchingRegistrationList, setNullInfo, onPressPostRequest, setErrorStatus, setStatus }