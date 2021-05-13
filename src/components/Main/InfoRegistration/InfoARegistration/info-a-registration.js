import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Text, Dimensions, Alert, Modal } from 'react-native'
import { OutlinedTextField, FilledTextField, TextField } from 'rn-material-ui-textfield'
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux'
import { setInfoARegistration, setInfoOfItem, setLocationOfItem } from '../../../../core/Actions/RegistrationAction';
import { actionsType } from '../../../../globals/constants';

import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getNameLocation } from '../../../../core/Service/location';


const InfoARegistration = (props) => {

    //const { item, editable } = props.route.params
    const [item, setItem] = useState(null)
    const [editable, setEditable] = useState(true)
    const { info, setNullError, setInfoOfItem } = props

    const { name, numPerson, phone, image, error, longitude, latitude } = info

    const [t, setTinh] = useState(null)
    const [h, setHuyen] = useState(null)
    const [x, setXa] = useState(null)

    const [lTinh, setListTinh] = useState([])
    const [lHuyen, setListHuyen] = useState([])
    const [lXa, setListXa] = useState([])

    const [openlTinh, setOpenlTinh] = useState(false);
    const [openlHuyen, setOpenlHuyen] = useState(false);
    const [openlXa, setOpenlXa] = useState(false);

    const [fullScreenMap, setFullScreenMap] = useState(false)

    const initLocation = () => {
        const { tinh, huyen, xa, listTinh, listHuyen, listXa } = getNameLocation(item.wardID)

        setTinh(tinh),
            setHuyen(huyen),
            setXa(xa),
            setListTinh(listTinh),
            setListHuyen(listHuyen),
            setListXa(listXa)
    }

    useLayoutEffect(() => {
        setNullError()
        if (!editable) {
            setInfoOfItem(item)
            initLocation()
        }
    }, [])

    return (
        <>
            <Modal
                animationType='none'
                visible={fullScreenMap}
                onRequestClose={() => {
                    setFullScreenMap(false)
                }}
            >
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={longitude ? {
                        longitude: longitude,
                        latitude: latitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    } : null}
                >
                    {longitude ? (<Marker
                        key={0}
                        title={name}
                        coordinate={{ longitude: longitude, latitude: latitude }}
                    ></Marker>) : null}

                </MapView>
                <Ionicons
                    name="expand-outline"
                    size={27}
                    style={{ position: 'absolute', alignSelf: 'flex-end', padding: 2, backgroundColor: 'gray' }}
                    onPress={() => setFullScreenMap(false)}
                />
            </Modal>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior='height'
                    style={styles.container}>
                    {image ?
                        <Image
                            source={{
                                uri: image
                            }}
                            style={styles.image}
                        /> : <Image
                            source={require('../../../../../assets/avatar-none.png')}
                            style={styles.image}
                        />}

                    <View style={{ width: '90%' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 5, marginRight: 9 }}>
                                <OutlinedTextField
                                    label="Hộ gia đình"
                                    editable={editable}
                                    value={name}
                                />
                            </View>
                            <View style={{ flex: 2 }}>
                                <OutlinedTextField
                                    label="Số người"
                                    editable={editable}
                                    value={numPerson?.toString()}
                                    error={error.numPerson}
                                />
                            </View>
                        </View>
                        <OutlinedTextField
                            label="Số điện thoại"
                            editable={editable}
                            value={phone}
                            error={error.phone}
                        ></OutlinedTextField>
                        <Text style={{ margin: 20 }}>Địa chỉ</Text>

                        <DropDownPicker
                            open={openlTinh}
                            setOpen={setOpenlTinh}

                            items={lTinh}
                            setItems={setListTinh}

                            value={t}
                            setValue={setTinh}

                            listMode="MODAL"
                            disabled={!editable}
                            style={styles.dropdown}
                        />

                        <DropDownPicker
                            open={openlHuyen}
                            setOpen={setOpenlHuyen}

                            items={lHuyen}
                            setItems={setListHuyen}

                            value={h}
                            setValue={setHuyen}

                            listMode="MODAL"
                            disabled={!editable}
                            style={styles.dropdown}
                        />

                        <DropDownPicker
                            open={openlXa}
                            setOpen={setOpenlXa}

                            items={lXa}
                            setItems={setListXa}

                            value={x}
                            setValue={setXa}

                            listMode="MODAL"
                            disabled={!editable}
                            style={styles.dropdown}
                        />

                        <Text style={{ margin: 20 }}>Tọa Độ</Text>
                        <View style={{ borderWidth: 2 }}>
                            <MapView
                                style={styles.map}
                                initialRegion={longitude ? {
                                    latitude: latitude,
                                    longitude: longitude,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                } : null}
                            >

                                {longitude ? (<Marker
                                    key={0}
                                    title={name}
                                    coordinate={{ longitude: longitude, latitude: latitude }}
                                ></Marker>) : null}

                            </MapView>
                            <Ionicons
                                name="expand-outline"
                                size={27}
                                style={{ position: 'absolute', alignSelf: 'flex-end', padding: 2, backgroundColor: 'gray' }}
                                onPress={() => setFullScreenMap(true)}
                            />
                        </View>


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
    image: {
        height: 120,
        width: 120,
        borderRadius: 100,
        margin: 12
    },
    dropdown: {
        marginVertical: 2
    },
    map: {
        //width: Dimensions.get('window').width,
        height: 270,
    },
})

const mapStateToProps = (state) => {
    return {
        info: state.registration.infoARegistration
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        setInfoARegistration: (t, type) => dispatch(setInfoARegistration(t, type)),
        setInfoOfItem: (item) => dispatch(setInfoOfItem(item)),
        setNullError: () => dispatch(setInfoARegistration(null, actionsType.registration.setNullError)),
    }
}

export default connect(mapStateToProps, mapFuncToProps)(InfoARegistration)