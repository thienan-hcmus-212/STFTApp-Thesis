import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getListFlood } from '../../../../core/Service/satistic'
import MapView, { Marker } from 'react-native-maps';
import { getCenter } from 'geolib';
import { getNameLocation } from '../../../../core/Service/location';
import { searchCenterLocation } from '../../../../core/Service/search-location';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

const ListFlood = (props) => {
    const mapRef = useRef()
    const regionVN = {
        longitude: 107.64546570973431,
        latitude: 15.877540821864828,
        latitudeDelta: 4,
        longitudeDelta: 10,
    }

    const navigation = useNavigation()
    const { auth } = props
    const [floodLocation, setFloodLocation] = useState([])

    const getLocationFlood = (auth) => {
        getListFlood(auth).then((data) => {
            data.map((wardId) => {
                const name = getNameLocation(wardId)
                const locationName = name.xa + " , " + name.huyen + " , " + name.tinh
                searchCenterLocation(locationName)
                    .then((respone) => {
                        setFloodLocation((array) => [...array, {
                            location: respone,
                            id: wardId,
                            title: name.xa,
                            description: name.huyen + " , " + name.tinh
                        }])
                    }).catch((error) => {
                        console.log(error.respone)
                    })
            })
        }).catch((error) => {
            Alert.alert("Lỗi", `${error.message}`)
        })
    }

    useEffect(() => {
        floodLocation.length ?
            null :
            getLocationFlood(auth)
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ borderRadius: 100, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', marginRight: 12, padding: 2 }}
                    onPress={() => {
                        setFloodLocation([])
                        getLocationFlood(auth)
                        mapRef.current.animateToRegion(regionVN)
                    }}
                >
                    <Icon
                        name="refresh-circle"
                        size={40}
                        color="white"
                    />
                </TouchableOpacity>
            ),
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={regionVN}
                ref={mapRef}
            >
                {floodLocation ?
                    floodLocation.map((item, index) => {
                        return (
                            <Marker
                                key={item.id}
                                coordinate={{
                                    longitude: item.location[0],
                                    latitude: item.location[1]
                                }}
                                title={item.title}
                                description={item.description}
                            />
                        )
                    })
                    : null}

            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapFuncToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapFuncToProps)(ListFlood)