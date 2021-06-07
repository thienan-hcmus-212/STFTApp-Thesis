import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, Alert } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getCurrentLocation } from '../../../../core/Service/location'

import { connect } from 'react-redux'
import { setRescueUnit, setList, addRefIndexToItem } from '../../../../core/Actions/RescueAction'
import { actionsType } from '../../../../globals/constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { stopRescue, sendLocation } from '../../../../core/Service/rescue'

import { MarkerForItemList } from './MarkerForItemList/maker-for-item-list'

import { getRhumbLineBearing } from 'geolib'
import { customStyle } from '../../../../core/Service/style_map'
import ModalLoading from '../../../Common/modal-loading'
import ViewTopMap from './ViewTopMap/view-top-map'
import ViewBottomMap from './ViewBottomMap/view-bottom-map'




const Rescue = (props) => {
    //constant
    const delta = 0.012

    //ref
    const mapRef = useRef()
    const markerRef = useRef([])
    let intervalRefSendLocation = useRef()
    let intervalRefGetLocation = useRef()

    //core
    const { navigation, auth } = props

    //redux state
    const { userLocation, listVictim, go } = props.data
    const { startLocation, destinationItem, destinationList, routeToDestinationList } = go

    //funtion
    const { setUserLocation, setSelectItem } = props.setData
    const { fetchDataAndSetListVictim, addRefIndexToItem } = props

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

    

    const onPressMarker = (item) => {
        setSelectItem(item)
        setIsShowInfoItem(true)
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
                    mapRef={mapRef}
                ></ViewTopMap>

                <ViewBottomMap
                    isShowInfoItem={isShowInfoItem}
                    setIsShowInfoItem={(isShow)=>setIsShowInfoItem(isShow)}
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
        },
        fetchDataAndSetListVictim: (auth) => dispatch(setList(auth)),
        addRefIndexToItem: (id, index) => dispatch(addRefIndexToItem(id, index)),
    }
}

export default connect(mapStateToProps, mapFuncToProps)(Rescue)