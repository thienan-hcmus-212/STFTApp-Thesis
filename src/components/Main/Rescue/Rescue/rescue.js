import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Alert, Modal, ActivityIndicator, Linking } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getCurrentLocation } from '../../../../core/Service/location'

import { connect } from 'react-redux'
import { setRescueUnit, setList, addRefIndexToItem, refreshGo } from '../../../../core/Actions/RescueAction'
import { actionsType } from '../../../../globals/constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { stopRescue, sendLocation } from '../../../../core/Service/rescue'

import ShowInfo from './ShowInfo/show-info'
import { MarkerForItemList } from './MarkerForItemList/maker-for-item-list'

import { getRhumbLineBearing, getCenter } from 'geolib'
import { getDirectionTwoPoint } from '../../../../core/Service/map-direction'
import { customStyle } from '../../../../core/Service/style_map'
import ShowRoute from './ShowRoute/show-route'
import ModalLoading from '../../../Common/modal-loading'
import ViewTopMap from './ViewTopMap/view-top-map'




const Rescue = (props) => {
    //constant
    const delta = 0.012

    //ref
    const mapRef = useRef()
    const actionSheetRef = useRef()
    const markerRef = useRef([])
    let intervalRefSendLocation = useRef()
    let intervalRefGetLocation = useRef()

    //core
    const { navigation, auth } = props

    //pseudo state
    const { userLocation, listVictim, go } = props.data
    const { selectItem, startLocation, destinationItem, destinationList, routeToDestinationList } = go

    //funtion
    const { setUserLocation, setSelectItem, setStartLocation, setDestinationList, setRouteToDestinationList } = props.setData
    const { fetchDataAndSetListVictim, addRefIndexToItem, refreshTrip } = props

    //local
    const [isModalLoading, setIsModalLoading] = useState(false)
    const [rotateDegUser, setRotateDegUser] = useState(-45)
    const [isShowInfoItem, setIsShowInfoItem] = useState(false)
    const [isShowListRoute, setIsShowListRoute] = useState(false)


    //get list first time 
    //internet
    useEffect(() => {
        fetchDataAndSetListVictim(auth)
    }, [])

    //get user location
    useEffect(() => {
        intervalRefGetLocation = setInterval(() => {
            getCurrentLocation().then((location) => {
                const long = location.coords.longitude
                const lat = location.coords.latitude
                const loca = {
                    longitude: long,
                    latitude: lat
                }
                const rotate = Math.trunc(getRhumbLineBearing(userLocation, loca) - 45)
                setRotateDegUser(rotate)
                setUserLocation(loca)
            }).catch((error) => {
                Alert.alert("Lỗi", `${error.message}`)
            })
        }, 5000)
        return () => clearInterval(intervalRefGetLocation)
    }, [])

    //send location : 10s / 1 lan 
    //internet
    useEffect(() => {
        intervalRefSendLocation = setInterval(() => {
            sendLocation(userLocation, auth)
        }, 10000)
        return () => clearInterval(intervalRefSendLocation)
    }, [])

    //get list after send location 
    //internet
    useEffect(() => {
        setTimeout(() => {
            fetchDataAndSetListVictim(auth)
        }, 3000)
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
                    style: 'cancel',
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

    const getCurrentGPS = () => {
        if (mapRef.current) {
            mapRef.current.animateCamera({ center: userLocation, zoom: 12 })
        }
    }

    const onPressMarker = (item) => {
        setSelectItem(item)
        setIsShowInfoItem(true)
        mapRef.current?.animateCamera({ center: { longitude: item.longitude, latitude: item.latitude }, zoom: 15 })
    }

    const onDirectionPress = (item) => {
        const destination = {
            longitude: item.longitude,
            latitude: item.latitude
        }
        const pointCenter = getCenter([userLocation, destination])
        const region = {
            longitude: pointCenter.longitude,
            latitude: pointCenter.latitude,
            longitudeDelta: Math.abs(item.longitude - userLocation.longitude) + delta * 2,
            latitudeDelta: Math.abs(item.latitude - userLocation.latitude) + delta * 2
        }
        mapRef.current?.animateToRegion(region)

        setDestinationList([item])

        setStartLocation(userLocation)
        getDirectionTwoPoint(userLocation, destination).then((array) => {
            setRouteToDestinationList(array)
        }).catch((error) => {

        })
    }

    const onPressFocus = () => {
        const endLocation = (destinationItem) ? ({ longitude: destinationItem.longitude, latitude: destinationItem.latitude }) : userLocation
        if (mapRef.current) {
            const heading = getRhumbLineBearing(userLocation, endLocation)
            mapRef.current.animateCamera({
                center: userLocation,
                pitch: 60,
                heading: heading,
                zoom: 17,
            })
        }
        setRotateDegUser(-45)
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

    const onPressQuit = () =>{
        return (destinationItem)?
            Alert.alert("Thông báo", "Hành trình sẽ được làm mới và bạn sẽ cài đặt lại lộ trình!!",[
                {
                    text: 'Thoát cứu hộ',
                    onPress: ()=>navigation.goBack()
                },
                {
                    text: 'không',
                    style: 'cancel'
                },
                {
                    text: 'đồng ý',
                    onPress:()=>{
                        refreshTrip()
                        getCurrentGPS()
                    }
                }
            ])
            : navigation.goBack()
    }

    const renderMarkerForRescuer = (
            <Marker
                key={0}
                coordinate={{ longitude: userLocation.longitude, latitude: userLocation.latitude }}
            >
                <View style={{ backgroundColor: "white", padding: 9, borderRadius: 100, transform: [{ rotate: `${rotateDegUser}deg` }] }}>
                    <Ionicons
                        name='navigate'
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
                strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
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
            >

                {renderMarkerForRescuer}

                {listVictim && listVictim.map((item) => {
                    const addRef = (el) => addToRef(el, item.id)
                    return MarkerForItemList(item, onPressMarker, addRef)
                })}

                {destinationItem ? renderDirection() : null}

            </MapView>

            <View style={styles.interactMap}>
                <ViewTopMap
                    isShowListRoute={isShowListRoute}
                    setIsShowListRoute={(isShow)=>setIsShowListRoute(isShow)}
                    onPressQuit={()=>onPressQuit()}
                ></ViewTopMap>


                <ShowInfo
                    ref={actionSheetRef}
                />

                <View style={styles.interactBottom}>
                    <View style={styles.touchBottom}>

                        <TouchableOpacity
                            style={styles.icon_location}
                            onPress={() => onPressFocus()}
                        >
                            <FontAwesome5Icon
                                name='compass'
                                size={24}
                                color='black'
                            ></FontAwesome5Icon>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.icon_location, { padding: 2 }]}
                            onPress={() => {
                                setIsShowInfoItem(!isShowInfoItem)
                            }}
                        >
                            <Ionicons
                                name={isShowInfoItem ? "chevron-down-circle" : "chevron-up-circle"}
                                size={36}
                                color='black'
                            ></Ionicons>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.icon_location}
                            onPress={() => getCurrentGPS()}
                        >
                            <Ionicons
                                name="locate"
                                size={24}
                                color='black'
                            ></Ionicons>
                        </TouchableOpacity>
                    </View>
                    {(!isShowInfoItem) ? null :
                        <View style={styles.infoItem}>
                            <TouchableOpacity style={styles.callbutton}
                                onPress={() => {
                                    Linking.openURL(`tel: ${selectItem?.phone}`)
                                }}
                            >
                                <FontAwesome5Icon
                                    name='phone'
                                    size={70}
                                    color='white'
                                ></FontAwesome5Icon>

                            </TouchableOpacity>
                            <View style={styles.infoView}>
                                <TouchableOpacity style={{ borderBottomWidth: 2, width: '100%', alignItems: 'center' }}
                                    onPress={() => {
                                        actionSheetRef?.current?.show()
                                    }}
                                >
                                    <Ionicons
                                        name="chevron-up-outline"
                                        size={20}
                                    >
                                    </Ionicons>
                                </TouchableOpacity>
                                <Text style={styles.textInfo}>Tên: {selectItem?.name}</Text>
                                <Text style={styles.textInfo}>Số người: {selectItem?.numPerson}</Text>

                            </View>
                            <TouchableOpacity
                                style={styles.directionButton}
                                onPress={() => selectItem ? onDirectionPress(selectItem) : null}
                            >
                                <FontAwesome5Icon
                                    name='directions'
                                    size={70}
                                    color='white'
                                ></FontAwesome5Icon>
                            </TouchableOpacity>
                        </View>}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    textInfo: {
        fontSize: 15,
        marginTop: 7
    },
    infoView: {
        flex: 4,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    directionButton: {
        backgroundColor: 'red',
        height: '100%',
        flex: 3,
        borderTopLeftRadius: 70,
        borderBottomLeftRadius: 70,
        borderLeftWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20
    },
    callbutton: {
        backgroundColor: 'green',
        height: '100%',
        flex: 3,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
        borderRightWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 120,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
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
    interactBottom: {
        minHeight: '15%',
        justifyContent: 'flex-start',

    },
    touchBottom: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 20,
    },
    icon_location: {
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 7
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
            setBoardSize: (size) => dispatch(setRescueUnit(size, actionsType.rescue.setBoardSize)),
            setSelectItem: (item) => dispatch(setRescueUnit(item, actionsType.rescue.setSelectItem)),
            setStartLocation: (location) => dispatch(setRescueUnit(location, actionsType.rescue.setStartLocation)),
            setDestinationList: (list) => dispatch(setRescueUnit(list, actionsType.rescue.setDestinationList)),
            setRouteToDestinationList: (list) => dispatch(setRescueUnit(list, actionsType.rescue.setRouteToDestinationList))
        },
        fetchDataAndSetListVictim: (auth) => dispatch(setList(auth)),
        addRefIndexToItem: (id, index) => dispatch(addRefIndexToItem(id, index)),
        refreshTrip: () => dispatch(refreshGo())
    }
}

export default connect(mapStateToProps, mapFuncToProps)(Rescue)