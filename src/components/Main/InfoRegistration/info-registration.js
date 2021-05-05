import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const InfoRegistration = ()=>{
    return (
        <View style={styles.container}>
            <Text>
                InfoRegistration
            </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
})

export default InfoRegistration