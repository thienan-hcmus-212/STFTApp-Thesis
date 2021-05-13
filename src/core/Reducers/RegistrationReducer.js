import { actionsType } from "../../globals/constants"

const initRegistration = {
    isLoadingFetchingList: false,
    registrationList: [],
    infoARegistration: {
        name: "",
        numPerson: 0,
        phone: null,
        wardId: null,
        longitude: null,
        latitude: null,
        image: null,
        error: {
            numPerson: null,
            phone: null,
            wardId: null
        }
    }
}

const initNullError = {
    numPerson: null,
    phone: null,
    wardId: null
}

const RegistrationReducers = (state = initRegistration, action) => {
    switch (action.type) {
        case actionsType.registration.setName:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    name: action.t
                }
            }
        case actionsType.registration.setNumPerson:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    numPerson: action.t
                }
            }
        case actionsType.registration.setPhone:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    phone: action.t
                }
            }
        case actionsType.registration.setLatitude:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    latitude: action.t
                }
            }
        case actionsType.registration.setLongitude:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    longitude: action.t
                }
            }
        case actionsType.registration.wardId:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    wardId: action.t
                }
            }
        case actionsType.registration.setErrorNumPersion:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    error: {
                        ...state.infoARegistration.error,
                        numPerson: action.errorNumPerson
                    }
                }
            }
        case actionsType.registration.setErrorPhone:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    error: {
                        ...state.infoARegistration.error,
                        phone: action.errorPhone
                    }
                }
            }
        case actionsType.registration.setNullError:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    error: initNullError
                }
            }
        case actionsType.registration.setImage:
            return {
                ...state,
                infoARegistration:{
                    ...state.infoARegistration,
                    image: action.t
                }
            }
        case actionsType.registration.setErrorWardId:
            return {
                ...state,
                infoARegistration: {
                    ...state.infoARegistration,
                    error: {
                        ...state.infoARegistration.error,
                        wardId: action.errorWardId
                    }
                }
            }
        case actionsType.registration.setListData:
            return {
                ...state,
                registrationList: action.list
            }
        case actionsType.registration.setLoadingListTrue:
            return{
                ...state,
                isLoadingFetchingList: true
            }
        case actionsType.registration.setLoadingListFalse:
            return {
                ...state,
                isLoadingFetchingList: false
            }
    }
    return state
}

export default RegistrationReducers