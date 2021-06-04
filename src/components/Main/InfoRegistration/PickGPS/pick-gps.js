import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

import MapView, { Marker, Camera } from 'react-native-maps';
import { app } from '../../../../globals/constants';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getCurrentLocation } from '../../../../core/Service/location';

const PickGPS = (props) => {
    const delta=0.09

    const { navigation } = props
    const { longitude, latitude, initialRegion } = props.route.params
    const { setLatitude, setLongitude } = props.route.params //work but not effect to longitude and latitude, just effect to parent component which has negative to it

    const [region, setRegion] = useState({
        longitude: initialRegion.longitude,
        latitude: initialRegion.latitude,
        latitudeDelta: delta,
        longitudeDelta: delta
    })

    const mapRef = useRef()



    const getCurrentGPS = () => {
        getCurrentLocation().then((location)=>{
            const long=location.coords.longitude
            const lat=location.coords.latitude
            
            setRegion({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                latitudeDelta: delta/4,
                longitudeDelta: delta/4
            })

            if (mapRef.current){
                mapRef.current.animateCamera({
                    center:{longitude:long,latitude:lat},
                    zoom:16,
                    heading: 45,
                    pitch:0
                })
            }
        }).catch((e)=>{
            alert(e)
        })
    } 
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: initialRegion.latitude,
                    longitude: initialRegion.longitude,
                    longitudeDelta: delta,
                    latitudeDelta: delta
                }}
                onRegionChangeComplete={(region) => setRegion(region)}
                ref={mapRef} 
                rotateEnabled={true}             
            >
                {/* <Marker
                    key={0}
                    coordinate={{ longitude: region.longitude, latitude: region.latitude }}
                ></Marker> */}

            </MapView>

            <View style={styles.container_absolute_map}>
                <FontAwesome5Icon
                    name="map-marker-alt"
                    size={40}
                    color='red'
                ></FontAwesome5Icon>

            </View>

            <View style={styles.container_bottom}>

                <TouchableOpacity 
                    style={styles.icon_location}
                    onPress={()=>getCurrentGPS()}
                >
                    <Ionicons
                        name="locate"
                        size={40}
                        color='white'
                    ></Ionicons>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => {
                    setLongitude(region.longitude)
                    setLatitude(region.latitude)
                    navigation.goBack()
                }}
                    style={styles.save_icon}
                
                >
                    <Text style={styles.text_save_icon}>Lưu</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

// const check=(pre,next)=>{
//     console.log(pre)
//     console.log(next)
//     return false

// }

// const PickGPS = React.memo(PickGPS_noMemo,check)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    container_absolute_map: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        //backgroundColor:'white',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container_bottom: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'flex-end',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 40,
    },
    icon_location:{
        alignSelf: 'flex-end',
        margin: 20, 
        backgroundColor: 'black', 
        borderRadius: 100,
        padding:7
    },
    save_icon:{
        margin: 20,
        width:'90%',
        justifyContent: 'center',
        backgroundColor: 'blue',
        alignItems: 'center',
        height: 40
    },
    text_save_icon:{
        color: 'white'
    }
})

export default PickGPS