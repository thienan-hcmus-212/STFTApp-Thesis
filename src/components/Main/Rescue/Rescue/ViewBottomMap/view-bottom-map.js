import React, { useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Linking, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import { connect } from 'react-redux'

import { getRhumbLineBearing, getCenter,getCenterOfBounds } from 'geolib'
import { actionsType } from '../../../../../globals/constants'
import { getDirectionList } from '../../../../../core/Service/map-direction'
import { setRescueUnit } from '../../../../../core/Actions/RescueAction'
import ShowInfo from '../ShowInfo/show-info'


const ViewBottomMap = (props) => {

    const delta = 0.009

    const { isShowInfoItem, setIsShowInfoItem, mapRef } = props

    //redux
    const { destinationItem, selectItem, destinationList, startLocation } = props.data
    const { userLocation } = props

    //redux func
    const { setDestinationList, setStartLocation, setRouteToDestinationList } = props


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
    }

    const getCurrentGPS = () => {
        mapRef.current?.animateCamera({ center: userLocation, zoom: 13 })
    }

    const onStartDirectionPress = (item) => {
        const destination = {
            longitude: item.longitude,
            latitude: item.latitude
        }
        const pointCenter = getCenter([userLocation, destination])
        const region = {
            longitude: pointCenter.longitude,
            latitude: pointCenter.latitude,
            longitudeDelta: Math.abs(item.longitude - userLocation.longitude) + delta,
            latitudeDelta: Math.abs(item.latitude - userLocation.latitude) + delta,
        }
        mapRef.current?.animateToRegion(region)

        setDestinationList([item])
        setStartLocation(userLocation)

        getDirectionList([userLocation, destination]).then((array) => {
            setRouteToDestinationList(array)
        }).catch((error) => {

        })

    }

    const onAddDestinationList = (item) =>{
        
        let minLog = userLocation.longitude
        let minLat = userLocation.latitude
        let maxLog = userLocation.longitude
        let maxLat = userLocation.latitude

        const listLocation =[startLocation,...destinationList,item].map((i)=>{
            minLog=i.longitude>minLog?minLog:i.longitude
            minLat=i.latitude>minLat?minLat:i.latitude
            maxLog=i.longitude>maxLog?i.longitude:maxLog
            maxLat=i.latitude>maxLat?i.latitude:maxLat
            return {
                longitude: i.longitude,
                latitude: i.latitude
            }
        })

        const pointCenter = getCenterOfBounds(listLocation)
        const region = {
            longitude: pointCenter.longitude,
            latitude: pointCenter.latitude,
            longitudeDelta: Math.abs(maxLog - minLog) + delta,
            latitudeDelta: Math.abs(maxLat - minLat) + delta,
        }
        mapRef.current?.animateToRegion(region)

        setDestinationList([...destinationList,item])
        getDirectionList(listLocation).then((array) => {
            setRouteToDestinationList(array)
        }).catch((error) => {

        })

    }
    
    const moreInfoRef = useRef()

    

    const onPressDirectionButton = (item)=>{
        if (selectItem){
            if (destinationItem){
                return onAddDestinationList(selectItem) 
            }
            return onStartDirectionPress(selectItem)
        }
    }

    return (
        <>
            {selectItem && <ShowInfo
                ref={moreInfoRef}
            ></ShowInfo>}

            <View style={styles.container}>
                <View style={styles.touchBottom}>
                    <View style={styles.touchBottomLeft}>
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
                            style={styles.focus}
                            onPress={() => onPressFocus()}
                        >
                            <Ionicons
                                name='navigate'
                                size={24}
                                color='black'
                            ></Ionicons>
                            <Text>Về giữa</Text>
                        </TouchableOpacity>
                    </View>


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
                                    moreInfoRef.current?.show()
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
                            onPress={() => onPressDirectionButton()}
                        >
                            <Icon
                                name={destinationItem? "map-marker-plus" : 'directions'}
                                size={70}
                                color='white'
                            ></Icon>
                        </TouchableOpacity>
                    </View>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
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
        padding: 7,
    },
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
    touchBottomLeft: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    focus: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        padding: 9,
        marginLeft: 12
    }
})

const mapStateToProps = (state) => {
    return {
        data: state.rescue.go,
        userLocation: state.rescue.userLocation
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        setDestinationList: (list) => dispatch(setRescueUnit(list, actionsType.rescue.setDestinationList)),
        setStartLocation: (location) => dispatch(setRescueUnit(location, actionsType.rescue.setStartLocation)),
        setRouteToDestinationList: (array) => dispatch(setRescueUnit(array, actionsType.rescue.setRouteToDestinationList))
    }
}

export default connect(mapStateToProps, mapFuncToProps)(ViewBottomMap)