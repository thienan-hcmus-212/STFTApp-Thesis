import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ShowRoute from '../ShowRoute/show-route'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const ViewTopMap = (props)=>{

    const { isShowListRoute, setIsShowListRoute, onPressQuit } = props
    return (
        <View style={styles.container}>

                    <View style={styles.routeInfo}>
                        {isShowListRoute &&
                            <View style={styles.routeShowInfo}>
                                <ShowRoute></ShowRoute>
                            </View>}
                        <TouchableOpacity
                            style={[styles.icon]}
                            onPress={() => {
                                setIsShowListRoute(!isShowListRoute)
                            }}
                        >
                            <Ionicons
                                name={isShowListRoute ? "chevron-up-circle" : "chevron-down-circle"}
                                size={36}
                                color='black'
                            ></Ionicons>
                        </TouchableOpacity>
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
                        <TouchableOpacity>
                            <View style={{ backgroundColor: isShowListRoute ? 'black' : "white", padding: 10, borderRadius: 100 }}>
                                <FontAwesome5Icon
                                    name='list-ul'
                                    size={40}
                                    color={isShowListRoute ? 'white' : "black"}
                                ></FontAwesome5Icon>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
    )
}

const styles = StyleSheet.create({
    container:{
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
        padding: 2, 
        margin: 24
    },
})

export default ViewTopMap