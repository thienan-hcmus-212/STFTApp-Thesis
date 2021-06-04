import React, { useEffect, useLayoutEffect, useState } from 'react'

import { View, StyleSheet, Text } from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';
import { getListHuyen, getListTinh, getNameLocation, getListXa } from '../../core/Service/location';

const SelectLocation = (props) => {

    const { wardId, setWardId, editable,error ,onFocus } = props

    const [t, setTinh] = useState(null)
    const [h, setHuyen] = useState(null)
    const [x, setXa] = useState(null)

    const [lTinh, setListTinh] = useState([])
    const [lHuyen, setListHuyen] = useState([])
    const [lXa, setListXa] = useState([])

    const [openlTinh, setOpenlTinh] = useState(false);
    const [openlHuyen, setOpenlHuyen] = useState(false);
    const [openlXa, setOpenlXa] = useState(false);

    const initLocation = () => {
        const { tinh, huyen, xa, listTinh, listHuyen, listXa } = getNameLocation(wardId)

        setTinh(tinh)
        setHuyen(huyen)
        setXa(xa)
        setListTinh(listTinh)
        setListHuyen(listHuyen)
        setListXa(listXa)
    }

    useLayoutEffect(() => {
        if (!editable) {
            initLocation()
        }
        else {
            const listTinh = getListTinh()
            setListTinh(listTinh)
            setTinh(null)
            setOpenlTinh(false)
        }
    }, [])

    useLayoutEffect(() => {
        if (editable && t) {
            const listHuyen = getListHuyen(t)
            setListHuyen(listHuyen)
            setHuyen(null)
            setOpenlHuyen(false)
        }
        onFocus()
    }, [t])

    useLayoutEffect(() => {
        if (editable && h) {
            const listXa = getListXa(h)
            setListXa(listXa)
            setXa(null)
            setOpenlXa(false)
        }
        onFocus()
    }, [h])

    useEffect(() => {
        if (editable && x) {
            setWardId(x)
        }
        onFocus()
    }, [x])

    const location = () => {
        const {tinh,huyen,xa}= getNameLocation(wardId)
        const location = xa + ", " + huyen + ", " + tinh
        return wardId ? location : "chọn địa chỉ bên dưới"
    }

    return (
        <>
            <View style={{margin: 20}}>
                <Text>Địa điểm:  </Text>
                <Text style={error?styles.errorMessage:styles.textLocation}>{location()}</Text>
            </View>

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
                placeholder="Chọn Tỉnh"
            />

            {t && <DropDownPicker
                open={openlHuyen}
                setOpen={setOpenlHuyen}

                items={lHuyen}
                setItems={setListHuyen}

                value={h}
                setValue={setHuyen}

                listMode="MODAL"
                disabled={!editable}
                style={styles.dropdown}
                placeholder="Chọn Huyện"
                
            />}

            {h && <DropDownPicker
                open={openlXa}
                setOpen={setOpenlXa}

                items={lXa}
                setItems={setListXa}

                value={x}
                setValue={setXa}

                listMode="MODAL"
                disabled={!editable}
                style={styles.dropdown}
                placeholder="Chọn Xã"
            />}
        </>
    )

}

const styles = StyleSheet.create({
    dropdown: {
        marginVertical: 2
    },
    errorMessage: {
        borderRadius: 5,
        alignSelf: 'center',
        color: 'red',
        margin: 9
    },
    textLocation:{
        margin: 9,
        alignSelf:'center',
        color:'black'
    }
})

export default SelectLocation