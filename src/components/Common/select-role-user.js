import React, { useState } from 'react'
import {View, StyleSheet, Text} from 'react-native'

import CheckBox from '@react-native-community/checkbox'
import { app } from '../../globals/constants'


const SelectRoleUser = (props)=>{
    const [selectVolunteer, setSelectVolunteer] = useState(false)
    const [selectRescuer, setSelectRescuer] =useState(false)
    const {changeRoleUser} = props
    return (
        <View style={styles.constainer}>
            <Text>You are :</Text>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={selectVolunteer}
                        onValueChange={(isCheck) => {
                            setSelectVolunteer(isCheck);
                            changeRoleUser(isCheck,app.role.volunteer)
                        }}
                    />
                    <Text>A volunteer</Text>
                </View>
                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={selectRescuer}
                        onValueChange={(isCheck)=>{
                            setSelectRescuer(isCheck);
                            changeRoleUser(isCheck,app.role.rescuer)
                        }}
                    />
                    <Text>A rescuer</Text>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    constainer: {
        justifyContent:'flex-start',
        alignItems:'flex-start',
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