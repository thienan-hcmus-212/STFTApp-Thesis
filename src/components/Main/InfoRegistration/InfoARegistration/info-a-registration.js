import React, { useState, useEffect } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text, Alert, Modal, TouchableOpacity } from 'react-native'
import { OutlinedTextField } from 'rn-material-ui-textfield'

import { connect } from 'react-redux'
import { setInfoARegistration, setInfoOfItem, setNullInfo, onPressPostRequest, setErrorStatus} from '../../../../core/Actions/RegistrationAction';
import { actionsType, app } from '../../../../globals/constants';


import Ionicons from 'react-native-vector-icons/Ionicons'

import AvatarPicker from '../../../Common/avatar-picker';
import SetGPS from '../../../Common/set-gps';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { searchItemByImage } from '../../../../core/Service/image';
import { deleteRegistration, followRegistration } from '../../../../core/Service/registration';
import SelectLocation from '../../../Common/select-location';


const InfoARegistration = (props) => {

    const { item, editable } = props.route.params

    // const [item, setItem] = useState(null)
    // const [editable, setEditable] = useState(true)

    const navigation = useNavigation()
    const { auth, info } = props
    const { setNullError, setInfoOfItem, setInfoARegistration, setNullInfo, onPressPost, setNullErrorStatus } = props
    const { name, numPerson, phone, image, error, longitude, latitude, wardId, status } = info

    const [selectItem, setSelectItem] = useState(null)
    const [isModalCheck, setIsModalCheck] = useState(false)
    const [list, setList] = useState()
    const [startItem, setStartItem] = useState(-1)

    const checkListImage = (result,auth)=>{
        const registrations = result["registrations"]
        const arrayKey = Object.keys(registrations)
        let count = 0;
        arrayKey.map((key)=>{
            if (registrations[key]["__data__"]["create_by_username"]==auth.username){
                ++count
            }
        });
        return (arrayKey.length>count)
    }
    const checkItem = (result,auth,id) =>{
        const registrations = result["registrations"]
        const arrayKey = Object.keys(registrations)
        let start=id
        while ((start<arrayKey.length) && (registrations[start]["__data__"]["create_by_username"]==auth.username)){
            start=start+1
        }
        if (arrayKey.length<=start){
            return -1
        }
        return start
    }

    useEffect(() => {
        const a= list?.registrations[startItem].__data__;
        (startItem != -1) ? setSelectItem(list?.registrations[startItem].__data__) : null
    }, [startItem])

    const onPressAdd = (item) => {

        Alert.alert("Chú ý", "Bạn sẽ chọn người gần giống người bạn muốn đăng kí.", [
            {
                text: 'hủy',
                style: 'cancel'
            },
            {
                text: 'ok',
                style: 'destructive',
                onPress: () => {
                    searchItemByImage(auth, item).then((result) => {
                        setList(result)
                        if (checkListImage(result,auth)) {
                            setStartItem(checkItem(result,auth,0))
                            setIsModalCheck(true)
                        } else {
                            Alert.alert("Thông báo", "Chưa có người bạn muốn đăng kí trong danh sách của chúng tôi.", [
                                {
                                    text: 'Đăng kí sau',
                                    style: 'cancel'
                                },
                                {
                                    text: 'Đăng kí ngay',
                                    style: 'destructive',
                                    onPress: () => registerNow()
                                }
                            ])
                        }
                    }).catch((error) => {
                        Alert.alert("Lỗi", `${error.message}`)
                    })
                }
            }
        ])
    }

    const registerNow = () => {
        onPressPost(auth)
    }
    const onPressNot = () => {
        if (checkItem(list,auth,startItem+1)!=-1) {
            setStartItem(checkItem(list,auth,startItem+1))
        } else {
            Alert.alert("Chú ý Đã hết", "Bạn muốn đăng kí ngay hay xem lại danh sách?", [
                {
                    text: 'xem lại danh sách',
                    style: 'cancel',
                    onPress: () => {
                        setStartItem(checkItem(list,auth,0))
                        setSelectItem(list?.registrations[0].__data__)
                    }
                }, {
                    text: 'đăng kí ngay',
                    style: 'destructive',
                    onPress: () => {
                        setIsModalCheck(false)
                        setStartItem(-1)
                        registerNow()
                    }
                }
            ])
        }
    }
    const onPressOk = (item) => {
        setIsModalCheck(false)
        followRegistration(auth, item).then(() => {
            navigation.navigate(app.navigation.InfoRegistrationList)
        }).catch((error) => {
            Alert.alert("Lỗi", `${error.message}`)
        })

    }

    useEffect(() => {
        setNullError()
        if (!editable) {
            setInfoOfItem(item)
        } else
            setNullInfo()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setNullError()
                if (!editable) {
                    setInfoOfItem(item)
                }
            }
        }, [])
    )


    const onPressDelete = (item)=>{
        Alert.alert("Lưu ý", "Bạn muốn xóa đăng kí này",[
            {
                text:'Không',
                style:'cancel'
            },
            {
                text:'Ok',
                style:"destructive",
                onPress:()=>{
                    deleteRegistration(auth,item).then(()=>{
                        navigation.goBack()
                    }).catch((error)=>{
                        Alert.alert("Lỗi", `${error.message}`)
                    })
                }
            }
        ])

    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ borderRadius: 100, backgroundColor: editable?'#CAFF00':"white", marginRight: 20, padding: 3 }}
                    onPress={() => editable?onPressAdd(info):onPressDelete(item)}
                >
                    <Ionicons
                        name={editable?"checkmark":"trash-bin"}
                        size={40}
                        color="#000"
                    />
                </TouchableOpacity>
            ),
        })
    }, [navigation, info]);

    useEffect(() => {
        console.log(status);
        (status?.status?.status == 200 || status?.status == 200) ?
            navigation.goBack() :
            null
    }, [status])

    useEffect(() => {
        (status.error) ?
            Alert.alert(`${status.error.status}`, `${status.error.message}`, [
                {
                    text: "Cancel",
                    onPress: () => setNullErrorStatus(),
                    style: "cancel"
                }
            ]) : null
    }, [status])
    return (
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalCheck}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Ionicons
                            name="close"
                            size={30}
                            onPress={()=>setIsModalCheck(false)}
                            style={{alignSelf:'flex-end',margin: 4}}
                        ></Ionicons>
                        <ScrollView>
                            <View style={styles.showInfo}>
                                
                                <AvatarPicker
                                    style={{alignSelf: 'center'}}
                                    editable={false}
                                    image={(list?.url_list[startItem]!="")?app.apiImage.root + list?.url_list[startItem]:null}
                                />
                                <View style={{ width: '100%', marginTop: 20, padding: 12}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 5, marginRight: 9 }}>
                                            <OutlinedTextField
                                                label="Tên người thân"
                                                editable={false}
                                                value={selectItem?.name}
                                            />
                                        </View>
                                        <View style={{ flex: 3 }}>
                                            <OutlinedTextField
                                                label="Số"
                                                editable={false}
                                                value={selectItem ? selectItem.num_person.toString() : '0'}
                                            />
                                        </View>
                                    </View>

                                    <SelectLocation
                                        wardId={selectItem?.ward_id}
                                        editable={false}
                                    />

                                    <SetGPS
                                        longitude={selectItem?.longitude}
                                        latitude={selectItem?.latitude}
                                        editable={false}
                                        wardId={wardId}
                                        navigation={navigation}
                                        setLongitude={(t) => setInfoARegistration(t, actionsType.registration.setLongitude)}
                                        setLatitude={(t) => setInfoARegistration(t, actionsType.registration.setLatitude)}
                                        setWardId={(t) => setInfoARegistration(t, actionsType.registration.setWardId)}
                                    />
                                </View>

                            </View>

                        </ScrollView>
                    </View>
                    <View style={styles.interact}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]}
                            onPress={() => onPressOk(selectItem)}
                        >
                            <Text style={styles.text}>Người này</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}
                            onPress={() => onPressNot()}
                        >
                            <Text style={styles.text}>Không phải</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior='height'
                    style={styles.container}>

                    <AvatarPicker
                        editable={editable}
                        image={image}
                        setImage={(uri) => setInfoARegistration(uri, actionsType.registration.setImage)}
                    />


                    <View style={{ width: '90%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 5, marginRight: 9 }}>
                                <OutlinedTextField
                                    label="Tên người thân"
                                    editable={editable}
                                    value={name}
                                    onChangeText={(t) => setInfoARegistration(t, actionsType.registration.setName)}
                                />
                            </View>
                            <View style={{ flex: 2 }}>
                                <OutlinedTextField
                                    label="Số người"
                                    editable={editable}
                                    value={numPerson ? numPerson.toString() : '0'}
                                    error={error.numPerson}
                                    keyboardType='phone-pad'
                                    onChangeText={(t) => setInfoARegistration(t, actionsType.registration.setNumPerson)}
                                    onFocus={() => setInfoARegistration(null, actionsType.registration.setErrorNumPersion)}
                                />
                            </View>
                        </View>
                        <OutlinedTextField
                            label="Số điện thoại"
                            editable={editable}
                            value={phone}
                            error={error.phone}
                            keyboardType='phone-pad'
                            onChangeText={(t) => setInfoARegistration(t, actionsType.registration.setPhone)}
                            onFocus={() => setInfoARegistration(null, actionsType.registration.setErrorPhone)}
                        ></OutlinedTextField>



                        <SetGPS
                            longitude={longitude}
                            latitude={latitude}
                            editable={editable}
                            wardId={wardId}
                            navigation={navigation}
                            setLongitude={(t) => setInfoARegistration(t, actionsType.registration.setLongitude)}
                            setLatitude={(t) => setInfoARegistration(t, actionsType.registration.setLatitude)}
                            setWardId={(t) => setInfoARegistration(t, actionsType.registration.setWardId)}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View
                    style={{ height: 40 }}
                ></View>
            </ScrollView>

        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20

    },
    showInfo: {
        flex: 1,
        margin: 12
    },
    map: {
        //width: Dimensions.get('window').width,
        height: 270,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
    },
    modalView: {
        margin: 12,
        backgroundColor: "white",
        borderRadius: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        flex: 8
    },
    interact: {
        flexDirection: 'row',
        flex: 2,
        width: '90%',
        paddingBottom: 12
    },
    button: {
        shadowRadius: 4,
        borderRadius: 20,
        flex: 2,
        elevation: 5,
        backgroundColor: 'white',
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})

const mapStateToProps = (state) => {
    return {
        info: state.registration.infoARegistration,
        auth: state.auth,
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        setInfoARegistration: (t, type) => dispatch(setInfoARegistration(t, type)),
        setInfoOfItem: (item) => dispatch(setInfoOfItem(item)),
        setNullError: () => dispatch(setInfoARegistration(null, actionsType.registration.setNullError)),
        setNullInfo: () => dispatch(setNullInfo()),
        onPressPost: (auth) => dispatch(onPressPostRequest(auth)),
        setNullErrorStatus: () => dispatch(setErrorStatus(null))
    }
}

export default connect(mapStateToProps, mapFuncToProps)(InfoARegistration)