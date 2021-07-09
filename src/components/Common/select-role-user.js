import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import CheckBox from '@react-native-community/checkbox'
import { app } from '../../globals/constants'


const SelectRoleUser = (props) => {
    const [selectVolunteer, setSelectVolunteer] = useState(false)
    const [selectRescuer, setSelectRescuer] = useState(false)
    const [selectUser, setSelectUser] = useState(false)
    const [selectAuthority, setSelectAuthority] = useState(false)
    const { changeRoleUser } = props
    const { role } = props
    useLayoutEffect(()=>{
        role.map((item)=>{
            switch (item){
                case app.role.user:
                    setSelectUser(true)
                    return 'ok'
                case app.role.rescuer:
                    setSelectRescuer(true)
                    return 'ok'
                case app.role.authority:
                    setSelectAuthority(true)
                    return 'ok'
                case app.role.volunteer:
                    setSelectVolunteer(true)
                    return 'ok'
            }
        })
    },[])
    return (
        <View style={styles.constainer}>
            <Text>You are :</Text>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={selectUser}
                        onValueChange={(isCheck) => {
                            setSelectUser(isCheck);
                            changeRoleUser(isCheck, app.role.user)
                        }}
                    />
                    <Text>A user</Text>
                </View>
                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={selectAuthority}
                        onValueChange={(isCheck) => {
                            setSelectAuthority(isCheck);
                            changeRoleUser(isCheck, app.role.authority)
                        }}
                    />
                    <Text>A authority</Text>
                </View>
            </View>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={selectRescuer}
                        onValueChange={(isCheck) => {
                            setSelectRescuer(isCheck);
                            changeRoleUser(isCheck, app.role.rescuer)
                        }}
                    />
                    <Text>A rescuer</Text>
                </View>

                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={selectVolunteer}
                        onValueChange={(isCheck) => {
                            setSelectVolunteer(isCheck);
                            changeRoleUser(isCheck, app.role.volunteer)
                        }}
                    />
                    <Text>A volunteer</Text>
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%'
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})

export default SelectRoleUser