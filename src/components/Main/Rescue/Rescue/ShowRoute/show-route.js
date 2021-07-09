import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import ItemRoute from './item-route'
import { connect } from 'react-redux'
import { get1Destination, sendJourneyToServer, setDestinationList, setRescueUnit } from '../../../../../core/Actions/RescueAction'
import { actionsType } from '../../../../../globals/constants'

import { getRhumbLineBearing } from 'geolib'
import { remove1CommitfromJourneyList, sendCommitJourneyList } from '../../../../../core/Service/rescue'

const ShowRoute = (props) => {
    const { mapRef, markerRef } = props

    //redux
    const { auth } = props
    const { startLocation, listRefItem, destinationList, boardSize, isGo, userLocation, destinationItem, listVictim } = props
    const { setNewListDestination, setBoardSize, setGoButton, setSelectItem,setStartLocation,get1Destination,sendJourneyToServer } = props
    
    const user = {
        name: 'vị trí bắt đầu'
    }
    const focusUser = () => {
        mapRef.current?.animateCamera({ center: startLocation, zoom: 15 })
    }

    const focusMarker = (item) => {
        const idMarkerRef = listRefItem.find((i) => {
            return i.id == item.id
        }).indexRef
        mapRef.current?.animateCamera({ center: { longitude: item.longitude, latitude: item.latitude }, zoom: 15 })
        markerRef.current[idMarkerRef].showCallout()
        setSelectItem(item)
    }
    const deleteItem = (item) => {
        const newList = destinationList.filter((i) => {
            return i.id != item.id
        })
        setNewListDestination(newList)
        setBoardSize(boardSize + item.numPerson)
    }

    const onPressGo = () => {
        sendCommitJourneyList(destinationList, listVictim, auth).then(() => {
            const endLocation = (destinationItem) ? ({ longitude: destinationItem.longitude, latitude: destinationItem.latitude }) : userLocation
            if (mapRef.current) {
                const heading = getRhumbLineBearing(userLocation, endLocation)
                mapRef.current.animateCamera({
                    center: userLocation,
                    pitch: 60,
                    heading: heading,
                    zoom: 18,
                })
            }
            setGoButton(true)
        }).catch((error) => {
            Alert.alert("Lỗi", `${error?.message}`)
        })
    }

    const startAgain = () => {
        const endLocation = (destinationItem) ? ({ longitude: destinationItem.longitude, latitude: destinationItem.latitude }) : userLocation
        if (mapRef.current) {
            const heading = getRhumbLineBearing(userLocation, endLocation)
            mapRef.current.animateCamera({
                center: userLocation,
                pitch: 60,
                heading: heading,
                zoom: 18,
            })
        }
        setStartLocation(userLocation)
        setNewListDestination(destinationList)
    }

    const itemDone = (item)=>{
        get1Destination(userLocation,destinationItem)
        sendJourneyToServer(auth)
    }
    const itemImpossible = (item)=>{
        Alert.alert("Lưu ý","Bạn thực sự không thể đến giải cứu địa điểm đó?",[
            {
                style:'cancel',
                text:'không'
            },
            {
                style:'destructive',
                text:'đúng vậy',
                onPress:()=>{
                    remove1CommitfromJourneyList(item,auth).then(()=>{
                        deleteItem(item)
                    })
                }
            }
        ])  
    }
    return (
        <View style={styles.maxContainer}>
            <View style={boardSize == 0 ? { ...styles.size, backgroundColor: 'red' } : { ...styles.size, backgroundColor: 'green' }}>
                <Text style={{ fontSize: 9 }}>Số chỗ:</Text>
                <Text style={{ color: 'white' }}>{boardSize}</Text>
            </View>
            <View style={styles.container}>
                <ScrollView>
                    <ItemRoute
                        key={`itemRoute${-1}`}
                        item={user}
                        focusItem={() => focusUser()}
                        index={-1}
                    ></ItemRoute>
                    {destinationList.map((item, index) => {
                        return <ItemRoute
                            key={`itemRoute${item.id}`}
                            item={item}
                            focusItem={() => focusMarker(item)}
                            deleteItem={() => isGo ? itemImpossible(item) : deleteItem(item)}
                            index={index}
                            done={()=>itemDone(item)}
                        ></ItemRoute>
                    })}
                </ScrollView>
            </View>
            <TouchableOpacity style={isGo ? { ...styles.go, backgroundColor: 'blue' } : { ...styles.go, backgroundColor: 'green' }}
                onPress={() => (!isGo) ? onPressGo() : startAgain()}
            >
                <Text style={{ color: 'white' }}>{isGo ? "TÌM LẠI ĐƯỜNG" : "ĐI"}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    maxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    container: {
        justifyContent: 'flex-start',
        //backgroundColor:'green',
        width: '70%',
        height: '90%',
        borderRadius: 20,
        borderWidth: 2,
        padding: 9,
        flex: 7,
        marginTop: 12
    },
    size: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginVertical: 17,
        alignItems: 'center',
        marginHorizontal: 9,
        //backgroundColor: 'blue'
        borderWidth: 1,
        borderRadius: 12,
        padding: 2
    },
    go: {
        flex: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        marginVertical: 12,
        padding: 2,
        marginHorizontal: 9,
        borderRadius: 20,
        height: 54,
        backgroundColor: 'green'
    }
})

const mapStateToProps = (state) => {
    return {
        startLocation: state.rescue.go.startLocation,
        listRefItem: state.rescue.listRefItem,
        destinationList: state.rescue.go.destinationList,
        boardSize: state.rescue.boardSize,
        isGo: state.rescue.isGo,
        userLocation: state.rescue.userLocation,
        destinationItem: state.rescue.go.destinationItem,
        rotateDegUser: state.rescue.go.rotateDegUser,
        auth: state.auth,
        listVictim: state.rescue.listVictim
    }
}
const mapFuncToProps = (dispatch) => {
    return {
        setNewListDestination: (list) => dispatch(setDestinationList(list)),
        setBoardSize: (size) => dispatch(setRescueUnit(size, actionsType.rescue.setBoardSize)),
        setGoButton: (isgo) => dispatch(setRescueUnit(isgo, actionsType.rescue.setGobutton)),
        setSelectItem: (item) => dispatch(setRescueUnit(item, actionsType.rescue.setSelectItem)),
        setRotateDegUser: (deg) => dispatch(setRescueUnit(deg, actionsType.rescue.setRotateDegUser)),
        setListVictim: (list) => dispatch(setRescueUnit(list, actionsType.rescue.setListVictim)),
        setStartLocation: (location) => dispatch(setRescueUnit(location, actionsType.rescue.setStartLocation)),
        get1Destination: (userLocation,item)=> dispatch(get1Destination(userLocation,item)),
        sendJourneyToServer: (auth)=>dispatch(sendJourneyToServer(auth))
    }
}

export default connect(mapStateToProps, mapFuncToProps)(ShowRoute)