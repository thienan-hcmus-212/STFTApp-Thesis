import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { View, StyleSheet, Text, Alert, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { getCurrentLocation, getNameLocation } from '../../../../core/Service/location'
import { checkIsAccept, deleteRegistration } from '../../../../core/Service/rescueRegistration'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NumericInput from 'react-native-numeric-input'
import { actionsType, app } from '../../../../globals/constants'
import { startRescue } from '../../../../core/Service/rescue'
import { setRescueUnit } from '../../../../core/Actions/RescueAction'

const StartRescue = (props) => {

    let checkRef = useRef()

    const { wardId } = props.route.params
    const { deleteWardId } = props.route.params //function
    const [nameLocation, setNameLocation] = useState(null)
    const [isAccept, setIsAccept] = useState(false)
    const [isModalLoading, setIsModalLoading] = useState(false)
    const [isModalGoVisible, setIsModalGoVisible] = useState(false)
    const [boardSize, setBoardSize] = useState(1)
    const { auth } = props
    const { setUserBoardSize, setUserLocation } = props
    const { navigation } = props

    useEffect(() => {
        const loca = getNameLocation(wardId)
        setNameLocation(loca)
        checkIsAccept(auth).then((result) => {
            setIsAccept(result)
        }).catch((error) => {
            console.log(error)
        })
    }, [wardId,auth])

    useEffect(()=>{
        checkRef = setInterval(()=>{
            checkIsAccept(auth).then((result) => {
                setIsAccept(result)
            }).catch((error) => {
                console.log(error)
            })
        },3000)
        return ()=>clearInterval(checkRef)
    },[auth])

    const showNoti = isAccept ? "Bạn có thể xuất phát" : "Bạn cần phải được cho phép bởi chính quyền địa phương"

    const onPressAgreeDelete = (auth) => new Promise((resolve, reject) => {
        setIsModalLoading(true)
        deleteRegistration(auth,wardId).then((result) => {
            resolve(result)
            setIsModalLoading(false)
        }).catch((error) => {
            reject(error)
            setIsModalLoading(false)
        })
    })

    const onPressDeleteRegis = (auth) => {
        Alert.alert("Bạn thực sự muốn hủy đăng kí ở địa điểm này?", "Khi hủy bạn phải đăng kí một địa điểm khác để bắt đầu", [
            {
                text: "Hủy",
                style: 'cancel'
            },
            {
                text: "Đồng ý",
                onPress: () => {
                    onPressAgreeDelete(auth).then(() => {
                        deleteWardId()
                    }).catch((error) => {
                        Alert.alert("Thông báo", `${error.message}`)
                    })
                }
            }
        ])
    }

    const onPressGo = () => {
        if (!isAccept) {
            Alert.alert("Thông báo", "Bạn cần phải được chính quyền địa phương cấp phép để có thể tiếp tục")
        } else {
            setIsModalGoVisible(true)
        }
    }
    const onPressGoSubmit = () => {
        setIsModalGoVisible(false)

        getCurrentLocation().then((location) => {
            const long = location.coords.longitude
            const lat = location.coords.latitude
            const loca = {
                longitude: long,
                latitude: lat
            }
            setUserBoardSize(boardSize)
            setUserLocation(loca)
            startRescue(auth, loca, boardSize).then(() => {

                navigation.navigate(app.navigation.Rescue)
            }).catch((error) => {

                Alert.alert("Lỗi", `${error?.message}`)
            })
        }).catch((error) => {


            Alert.alert("Lỗi", `${error?.message}`)
        })

    }

    return (
        <View style={styles.container}>

            <Modal
                animationType="none"
                transparent={true}
                visible={isModalLoading}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator
                            size={90}
                            color="blue"
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalGoVisible}
                onRequestClose={() => {
                    setIsModalGoVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalGoView}>
                        <Text style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 17, }}>Sức chứa của thuyền: </Text>
                        <NumericInput
                            value={boardSize}
                            onChange={value => setBoardSize(value)}
                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                            totalWidth={240}
                            totalHeight={50}
                            iconSize={25}
                            step={1}
                            valueType='integer'
                            rounded
                            textColor='black'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='black'
                            leftButtonBackgroundColor='black'
                            maxValue={99}
                            minValue={1} />
                        <TouchableOpacity style={styles.go}
                            onPress={() => onPressGoSubmit()}
                        >
                            <Text style={{ color: 'black' }}>GO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={isAccept ? [styles.notificationView, styles.noti_accept] : [styles.notificationView, styles.noti_noAccept]}>
                <Text style={styles.text_main}>Bạn đăng kí cứu hộ ở: </Text>
                <View style={{ alignSelf: 'center' }}>
                    <Text style={styles.text_location}>{nameLocation?.xa}</Text>
                    <Text style={styles.text_location}>{nameLocation?.huyen}</Text>
                    <Text style={styles.text_location}>{nameLocation?.tinh}</Text>
                </View>
                <Text style={styles.text_noti}>{showNoti}</Text>
            </View>
            <View style={styles.letgo}>
                <TouchableOpacity
                    style={styles.delete_regis}
                    onPress={() => onPressDeleteRegis(auth)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons
                            name="close"
                            size={70}
                        ></Ionicons>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>XÓA ĐĂNG KÍ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.start_rescue}
                    onPress={() => onPressGo()}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons
                            name="arrow-forward-outline"
                            size={70}
                        ></Ionicons>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>BẮT ĐẦU CỨU</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    notificationView: {
        flex: 2,
        borderWidth: 2,
        borderRadius: 20,
        width: '90%',
        margin: 12,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letgo: {
        flex: 7,
        width: "90%",
        borderRadius: 20,
        flexDirection: 'row'
    },
    text_main: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    text_location: {
        fontSize: 15
    },
    text_noti: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 9
    },
    noti_accept: {
        backgroundColor: 'green'
    },
    noti_noAccept: {
        backgroundColor: "#FF3A00"
    },
    delete_regis: {
        backgroundColor: 'gray',
        flex: 1,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    start_rescue: {
        flex: 1,
        backgroundColor: 'green',
        borderTopRightRadius: 20,
        justifyContent: "center",
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        //backgroundColor: "white",
        borderRadius: 100,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1000,
    },
    modalGoView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1000,
        padding: 27,
        //width: "70%"
    },
    go: {
        alignSelf: 'center',
        margin: 20,
        borderWidth: 2,
        backgroundColor: 'green',
        padding: 20,
        borderRadius: 20
    }
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        setUserLocation: (location) => dispatch(setRescueUnit(location, actionsType.rescue.setUserLocation)),
        setUserBoardSize: (size) => dispatch(setRescueUnit(size, actionsType.rescue.setBoardSize))

    }
}

export default connect(mapStateToProps, mapFuncToProps)(StartRescue)