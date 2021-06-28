import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, Alert } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getCurrentLocation } from '../../../../core/Service/location'

import { connect } from 'react-redux'
import { setRescueUnit, setList, addRefIndexToItem, get1Destination, sendJourneyToServer, setLaterForItemOfDestinationList, refreshTrip } from '../../../../core/Actions/RescueAction'
import { actionsType, app } from '../../../../globals/constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { stopRescue, sendLocation } from '../../../../core/Service/rescue'

import { MarkerForItemList } from './MarkerForItemList/maker-for-item-list'

import { getDistance } from 'geolib'
import { customStyle } from '../../../../core/Service/style_map'
import ModalLoading from '../../../Common/modal-loading'
import ViewTopMap from './ViewTopMap/view-top-map'
import ViewBottomMap from './ViewBottomMap/view-bottom-map'

import { useNetInfo } from "@react-native-community/netinfo";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }


const Rescue = (props) => {
    //constant
    const delta = 0.012
    
    //intenet
    const netInfo = useNetInfo();

    //ref
    const mapRef = useRef()
    const markerRef = useRef([])
    let intervalRefGetLocation = useRef()

    //core
    const { navigation, auth } = props

    //redux state
    const { userLocation, listVictim, go, isGo, closerListVictim } = props.data
    const { startLocation, destinationItem, destinationList, routeToDestinationList, listTrace, rotateDegUser, selectItem } = go

    //funtion
    const { setUserLocation, setSelectItem, setListTrace, setRotateDegUser } = props.setData
    const { fetchDataAndSetListVictim, addRefIndexToItem, get1Destination, sendJourneyToServer , setLater, refreshTrip} = props

    //state
    const [isModalLoading, setIsModalLoading] = useState(false)
    const [isShowInfoItem, setIsShowInfoItem] = useState(false)
    const [isShowListRoute, setIsShowListRoute] = useState(false)
    const [isShowNotiClosestVictim, setIsShowNotiClosestVictim] = useState(false)

    const [headingOfMap, setHeadingOfMap] = useState(0)

    const previousDestinationList = usePrevious(destinationList)

    //get list first time 
    useEffect(() => {
        markerRef.current=[]
        fetchDataAndSetListVictim(auth)
    }, [])
    
    //get user current location
    useEffect(() => {
        intervalRefGetLocation = setInterval(() => {
            getCurrentLocation().then((location) => {

                setUserLocation(location.coords)
                setRotateDegUser(location.coords.heading + headingOfMap - 45)

            }).catch((error) => {
                //Alert.alert("Lỗi", `${error.message}`)
            })
        }, 10000)
        return () => clearInterval(intervalRefGetLocation)
    }, [])

    // set trace list when user move  
    useEffect(() => {
        if (isGo && userLocation){
            const lastLocation = listTrace[listTrace.length-1]
            if (getDistance(userLocation,lastLocation)>10) 
                setListTrace([...listTrace, userLocation])
        }
    }, [isGo,userLocation])

    //send location 
    useEffect(() => {
        userLocation?sendLocation(userLocation, auth):null
    }, [userLocation])

    
    // refresh when destination list = 0
    useEffect(()=>{
        if (previousDestinationList?.length>0 && destinationList.length<=0){
            refreshTrip()
            mapRef.current?.animateCamera({
                center: userLocation,
                zoom: 14
            })
        }
    },[destinationList])

    //check connect to intenet
    useEffect(()=>{
        (netInfo.isConnected)?sendJourneyToServer(auth):null
    },[netInfo])

    //get a destination
    useEffect(() => {
        
        if (userLocation && (destinationItem!=null) && isGo && (!isShowNotiClosestVictim)) {
            const distance = getDistance(userLocation,destinationItem)
            if ((distance < app.minDistance) && (destinationItem.later != true)) {
                setIsShowNotiClosestVictim(true)
                Alert.alert(`Đã rất gần người tên "${destinationItem.name}"`, "Nhấn vào \"đã cứu được\" hoặc tick xanh ở lộ trình phía trên để xác nhận tiếp tục!", [
                    {
                        style: 'cancel',
                        text: 'Để sau',
                        onPress: () => {
                            setLater(destinationItem.id)
                            setIsShowNotiClosestVictim(false)
                        }
                    },
                    {
                        text: 'Đã cứu được',
                        onPress: () => {
                            get1Destination(userLocation,destinationItem)
                            setIsShowNotiClosestVictim(false)
                            sendJourneyToServer(auth)
                        }
                    }
                ])
            }
        }
    }, [userLocation])


    //config back button
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            const action = e.data.action
            e.preventDefault()
            Alert.alert("Xác nhận", "Bạn thực sự muốn thoát cứu hộ", [
                {
                    text: "hủy",
                    style: 'cancel'
                },
                {
                    text: 'đồng ý',
                    style: 'destructive',
                    onPress: () => {
                        setIsModalLoading(true)
                        stopRescue(auth).then(() => {
                            setIsModalLoading(false)
                            navigation.dispatch(action)
                        }).catch((error) => {
                            setIsModalLoading(false)
                            Alert.alert("Lỗi", `${error?.message}`)
                        })
                    }
                }
            ])
        })
    }, [navigation])

    useEffect(()=>{
        selectItem && setIsShowInfoItem(true)
    },[selectItem])

    const onPressMarker = (item) => {
        setSelectItem(item)
        mapRef.current?.animateCamera({ center: { longitude: item.longitude, latitude: item.latitude }, zoom: 15 })
    }

    const addToRef = (el, id) => {
        const length = markerRef.current.length
        if (el) {
            if (markerRef.current.includes(el)) {
                return null
            }
            addRefIndexToItem(id, length)
            return markerRef.current[length] = el
        }
        return null
    }

    const renderMarkerForRescuer = (
        <Marker
            key={0}
            coordinate={{ longitude: userLocation.longitude, latitude: userLocation.latitude }}
        >
            <View style={{ backgroundColor: "white", padding: 9, borderRadius: 100, transform: [{ rotate: `${rotateDegUser}deg` }] }}>
                <Ionicons
                    name={(isGo && listTrace.length > 1) ? 'navigate' : 'radio-button-on'}
                    size={24}
                    color='black'
                ></Ionicons>
            </View>
        </Marker>
    )

    const renderDirection = () => (
        <>
            <Polyline
                coordinates={routeToDestinationList.map((item) => {
                    return {
                        longitude: item[0],
                        latitude: item[1]
                    }
                })}
                strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={7}
            ></Polyline>
            <Polyline
                coordinates={[startLocation, ...destinationList].map((item) => {
                    return {
                        longitude: item.longitude,
                        latitude: item.latitude
                    }
                })}
                strokeColor="white" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={7}
                lineDashPattern={[1]}
            ></Polyline>
        </>
    )

    const renderTraceOfUser = () => {
        return (
            <Polyline
                coordinates={listTrace.map((item) => {
                    return {
                        longitude: item.longitude,
                        latitude: item.latitude
                    }
                })}
                strokeColor="gray" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={7}
                lineDashPattern={[1]}
            ></Polyline>)
    }
    const onRegionChange = () => {
        mapRef.current?.getCamera().then((result) => {
            const changeRotate = result.heading - headingOfMap
            setRotateDegUser(rotateDegUser - changeRotate)
            setHeadingOfMap(result.heading)
        })
    }

    return (
        <View style={styles.container}>

            <ModalLoading isModalLoading={isModalLoading}></ModalLoading>

            <MapView
                style={styles.map}
                ref={mapRef}
                customMapStyle={customStyle}

                initialRegion={{
                    longitude: userLocation.longitude,
                    latitude: userLocation.latitude,
                    latitudeDelta: delta * 9,
                    longitudeDelta: delta * 9
                }}
                mapPadding={{
                    top: 240,
                    bottom: 120,
                    left: 21,
                    right: 21
                }}
                onRegionChange={() => onRegionChange()}
            >



                {(listVictim)?
                    (isGo?
                        [...destinationList,...closerListVictim].map((item)=>{
                            const addRef = (el) => addToRef(el, item.id)
                            return MarkerForItemList(item, onPressMarker, addRef)
                        }) 
                        :[...listVictim].map((item) => {
                            const addRef = (el) => addToRef(el, item.id)
                            return MarkerForItemList(item, onPressMarker, addRef)
                        })
                    ):null}

                {destinationItem ? renderDirection() : null}

                {isGo && renderTraceOfUser()}
                {renderMarkerForRescuer}

            </MapView>

            <View style={styles.interactMap}>
                <ViewTopMap
                    isShowListRoute={isShowListRoute}
                    setIsShowListRoute={(isShow) => setIsShowListRoute(isShow)}
                    mapRef={mapRef}
                    markerRef={markerRef}
                ></ViewTopMap>

                <ViewBottomMap
                    isShowInfoItem={isShowInfoItem}
                    setIsShowInfoItem={(isShow) => setIsShowInfoItem(isShow)}
                    mapRef={mapRef}
                ></ViewBottomMap>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    interactMap: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        data: state.rescue
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        setData: {
            setUserLocation: (location) => dispatch(setRescueUnit(location, actionsType.rescue.setUserLocation)),
            setSelectItem: (item) => dispatch(setRescueUnit(item, actionsType.rescue.setSelectItem)),
            setListTrace: (arrayLocation) => dispatch(setRescueUnit(arrayLocation, actionsType.rescue.setListTrace)),
            setRotateDegUser: (deg) => dispatch(setRescueUnit(deg, actionsType.rescue.setRotateDegUser))
        },
        fetchDataAndSetListVictim: (auth) => dispatch(setList(auth)),
        addRefIndexToItem: (id, index) => dispatch(addRefIndexToItem(id, index)),
        get1Destination: (userLocation,destinationItem) => dispatch(get1Destination(userLocation,destinationItem)),
        sendJourneyToServer: (auth)=>dispatch(sendJourneyToServer(auth)),
        setLater: (id)=>dispatch(setLaterForItemOfDestinationList(id)),
        refreshTrip: ()=>dispatch(refreshTrip())
    }
}

export default connect(mapStateToProps, mapFuncToProps)(Rescue)