import React from 'react'
import { View, Text, StyleSheet  } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

const ShowRoleUser = (props)=>{
    const role=props?.role
    return (
        <View style={styles.container}>
            <Text>Vai trò :</Text>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={role?.user?true:false}
                        tintColors='blue'
                        disabled={true}
                    />
                    <Text>người dùng</Text>
                </View>
                <View style={styles.checkboxItem}>
                    <CheckBox
                        value={role?.rescuer?true:false}
                        tintColors='blue'
                        disabled={true}
                    />
                    <Text>đội cứu hộ</Text>
                </View>
            </View>
        </View>
    )

}

const styles= StyleSheet.create({
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

export default ShowRoleUser