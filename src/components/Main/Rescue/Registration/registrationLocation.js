import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal, ActivityIndicator } from 'react-native'

import SelectLocation from '../../../Common/select-location';
import LogoApp from '../../../Common/logo-app'

import { connect } from 'react-redux'
import { app, stylesMain } from '../../../../globals/constants';
import { getNameLocation } from '../../../../core/Service/location';
import { registerWardId } from '../../../../core/Service/rescueRegistration';

const RegisterLocation = (props) => {
    
    const { auth } = props
    const { setFinalWardId } = props.route.params
    const [wardId, setWardId] = useState()
    const [errorWardId, setErrorWardId] = useState(null)

    const [isModalLoading,setIsModalLoading]= useState(false)

    const location = (wardId) => {
        const { tinh, huyen, xa } = getNameLocation(wardId)
        return xa + ", " + huyen + ", " + tinh
    }

    const onPressAgreeRegister = (auth)=> new Promise((resolve,reject)=>{
        setIsModalLoading(true)
        registerWardId(auth,wardId).then((result)=>{
            resolve(result)
            setIsModalLoading(false)
            
        }).catch((error)=>{
            reject(error)
            
            setIsModalLoading(false)
        })
    })

    const onPressRegister = (auth) => {
        if (!wardId) setErrorWardId("hãy chọn địa điểm để đăng ký")
        else {
            const loca = location(wardId)
            Alert.alert("Xác nhận",`Bạn đăng kí địa điểm ${loca}`,[
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đồng ý",
                    onPress: () => {
                        onPressAgreeRegister(auth).then(()=>{
                            setFinalWardId(wardId)
                        }).catch((error)=>{
                            Alert.alert("Thông báo",`${error.message}`)
                        })                     
                    }
                }
            ])
        } 
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
            <View style={{ height: 200, justifyContent: 'center' }}>
                <LogoApp size={120} textSize={24} />
            </View>
            <View style={{ width: '90%' }}>
                <SelectLocation
                    wardId={wardId}
                    editable={true}
                    setWardId={(t) => setWardId(t)}
                    error={errorWardId}
                    onFocus={() => setErrorWardId(null)}
                ></SelectLocation>
                <TouchableOpacity
                    style={{ ...stylesMain.button, backgroundColor: 'aqua', marginTop: 20, alignSelf: 'center' }}
                    onPress={() => {
                        onPressRegister(auth);
                    }}
                >
                    <Text>Đăng kí</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    centeredView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
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

export default connect(mapStateToProps, mapFuncToProps)(RegisterLocation)