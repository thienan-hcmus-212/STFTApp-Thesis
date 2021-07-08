import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getBaseRegion } from '../../core/Service/location';
import { app } from '../../globals/constants';

const SetGPS = (props) => {

    const mapRef = useRef()
    const { navigation } = props
    const { longitude, latitude, setLatitude, setLongitude, editable, wardId, setWardId } = props


    const [initialRegion, setInitialRegion] = useState()
    const [fullScreenShowMap, setFullScreenShowMap] = useState(false)

    useEffect(() => {

        const baseRegion = getBaseRegion(wardId)
        setInitialRegion(baseRegion)

    }, [])

    const pickGPS = () => {

        navigation.navigate(app.navigation.ModalPickGPS, {
            longitude: longitude,
            latitude: latitude,
            setLongitude: (t) => setLongitude(t),
            setLatitude: (t) => setLatitude(t),
            initialRegion: initialRegion,
            setWardId: (t) => setWardId(t)
        })
    }

    useEffect(() => {
        mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        })
    }, [longitude, latitude])

    return (
        <>
            <Modal
                animationType='none'
                visible={fullScreenShowMap}
                onRequestClose={() => {
                    setFullScreenShowMap(false)
                }}
            >
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={longitude && latitude ? {
                        longitude: longitude,
                        latitude: latitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    } : null}

                >
                    {longitude && latitude ? (<Marker
                        key={0}
                        coordinate={{ longitude: longitude, latitude: latitude }}
                    ></Marker>) : null}

                </MapView>
                <Ionicons
                    name="expand-outline"
                    size={27}
                    style={{ position: 'absolute', alignSelf: 'flex-end', padding: 2, backgroundColor: 'gray' }}
                    onPress={() => setFullScreenShowMap(false)}
                />
            </Modal>

            <Text style={{ margin: 20 }}>Tọa Độ</Text>
            {editable &&
                <TouchableOpacity
                    style={styles.pickGPS}
                    onPress={() => pickGPS()}
                >
                    <Text>Cài đặt GPS</Text>
                </TouchableOpacity>
            }
            <View style={{ borderWidth: 2 }}>
                <MapView
                    style={styles.map}
                    ref={mapRef}
                >

                    {longitude && latitude ? (<Marker
                        key={0}
                        coordinate={{ longitude: longitude, latitude: latitude }}
                    ></Marker>) : null}

                </MapView>
                <Ionicons
                    name="expand-outline"
                    size={27}
                    style={{ position: 'absolute', alignSelf: 'flex-end', padding: 2, backgroundColor: 'gray' }}
                    onPress={() => setFullScreenShowMap(true)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        //width: Dimensions.get('window').width,
        height: 270,
    },
    pickGPS: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        margin: 4,
        borderRadius: 12
    }
})

export default SetGPS