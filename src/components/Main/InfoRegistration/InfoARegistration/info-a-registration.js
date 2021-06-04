import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Text, Dimensions, Alert, Modal, TouchableOpacity } from 'react-native'
import { OutlinedTextField, FilledTextField, TextField } from 'rn-material-ui-textfield'

import { connect } from 'react-redux'
import { setInfoARegistration, setInfoOfItem, setNullInfo, onPressPostRequest, setErrorStatus } from '../../../../core/Actions/RegistrationAction';
import { actionsType } from '../../../../globals/constants';

import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons'

import AvatarPicker from '../../../Common/avatar-picker';
import SelectLocation from '../../../Common/select-location';
import SetGPS from '../../../Common/set-gps';
import { useFocusEffect } from '@react-navigation/native'


const InfoARegistration = (props) => {

    const { item, editable } = props.route.params

    // const [item, setItem] = useState(null)
    // const [editable, setEditable] = useState(true)

    const { navigation } = props
    const { auth, info } =props
    const { setNullError, setInfoOfItem, setInfoARegistration, setNullInfo, onPressPost, setNullErrorStatus } = props
    const { name, numPerson, phone, image, error, longitude, latitude, wardId, status } = info


    useLayoutEffect(() => {
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
                } else
                    setNullInfo()
            }
        }, [])
    )



    React.useLayoutEffect(() => {
        (editable) ? navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ borderRadius: 100, backgroundColor: 'red' }}
                    onPress={() => onPressPost(auth)}
                >
                    <Ionicons
                        name="checkmark"
                        size={40}
                        color="#fff"
                    />

                </TouchableOpacity>
            ),
        }) : null
    }, [navigation]);

    useEffect(() => {
        (status.status == 200) ?
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
                                    value={numPerson == 0 ? null : numPerson.toString()}
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

                        <SelectLocation
                            wardId={item ? item.ward.id : wardId}
                            editable={editable}
                            setWardId={(t) => setInfoARegistration(t, actionsType.registration.setWardId)}
                            error={error.wardId}
                            onFocus={()=>setInfoARegistration(null,actionsType.registration.setErrorWardId)}
                        ></SelectLocation>

                        <SetGPS
                            longitude={longitude}
                            latitude={latitude}
                            editable={editable}
                            wardId={wardId}
                            navigation={navigation}
                            setLongitude={(t) => setInfoARegistration(t, actionsType.registration.setLongitude)}
                            setLatitude={(t) => setInfoARegistration(t, actionsType.registration.setLatitude)}
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
    map: {
        //width: Dimensions.get('window').width,
        height: 270,
    },
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