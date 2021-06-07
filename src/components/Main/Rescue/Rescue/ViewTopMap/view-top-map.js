import React from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { connect } from 'react-redux'

import ShowRoute from '../ShowRoute/show-route'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { refreshGo } from '../../../../../core/Actions/RescueAction'
import { useNavigation } from '@react-navigation/native'

const ViewTopMap = (props) => {
    const navigation = useNavigation()
    //props
    const { isShowListRoute, setIsShowListRoute, mapRef } = props
    //redux
    const { userLocation } = props
    const { destinationItem } = props.data
    const { refreshTrip } = props

    const onPressQuit = () => {
        return (destinationItem) ?
            Alert.alert("Thông báo", "Lộ trình sẽ được làm mới và bạn phải cài đặt lại!!", [
                {
                    text: 'Thoát cứu hộ',
                    onPress: () => navigation.goBack()
                },
                {
                    text: 'không',
                    style: 'cancel'
                },
                {
                    text: 'đồng ý',
                    onPress: () => {
                        refreshTrip()
                        if (mapRef.current) {
                            mapRef.current.animateCamera({ center: userLocation, zoom: 12 })
                        }
                    }
                }
            ])
            : navigation.goBack()
    }


    return (
        <View style={styles.container}>

            <View style={styles.routeInfo}>
                {isShowListRoute &&
                    <View style={styles.routeShowInfo}>
                        <ShowRoute></ShowRoute>
                    </View>}
                {isShowListRoute && <TouchableOpacity
                    style={[styles.icon,{alignSelf:'flex-end',marginRight:21}]}
                    onPress={() => {
                        setIsShowListRoute(!isShowListRoute)
                    }}
                >
                    <Ionicons
                        name={isShowListRoute ? "chevron-up-circle" : "chevron-down-circle"}
                        size={36}
                        color='black'
                    ></Ionicons>
                </TouchableOpacity>}
            </View>
            <View style={styles.touchTop}>
                <TouchableOpacity
                    onPress={() => onPressQuit()}
                >
                    <FontAwesome5Icon
                        name='times'
                        size={27}
                        color={isShowListRoute ? 'black' : "white"}
                    ></FontAwesome5Icon>
                </TouchableOpacity>
                <View style={styles.touchTopRight}>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: isShowListRoute ? 'black' : "white", padding: 10, borderRadius: 100 }}>
                            <FontAwesome5Icon
                                name='list-ul'
                                size={40}
                                color={isShowListRoute ? 'white' : "black"}
                            ></FontAwesome5Icon>
                        </View>
                    </TouchableOpacity>
                    {(!isShowListRoute)&&<TouchableOpacity
                        style={[styles.icon,{alignSelf: 'center'}]}
                        onPress={() => {
                            setIsShowListRoute(!isShowListRoute)
                        }}
                    >
                        <Ionicons
                            name={isShowListRoute ? "chevron-up-circle" : "chevron-down-circle"}
                            size={36}
                            color='black'
                        ></Ionicons>
                    </TouchableOpacity>}
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "20%",
        justifyContent: 'flex-start',
    },
    routeShowInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 200,
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '100%'
    },
    routeInfo: {
        height: 200,
        //backgroundColor: 'black', 
        position: 'absolute',
        width: '100%',
        padding: 2,
        alignItems: 'center'
    },
    touchTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 20,
        margin: 9,

    },
    icon: {
        backgroundColor: 'white',
        borderRadius: 100,
        padding:2,
        margin:0,
        alignItems: 'center',
        height:39,
        width:39,
        justifyContent: 'center',
        marginTop: 9
    },
    touchTopRight: {
        justifyContent: 'flex-start',

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
        refreshTrip: () => dispatch(refreshGo())
    }
}
export default connect(mapStateToProps, mapFuncToProps)(ViewTopMap)