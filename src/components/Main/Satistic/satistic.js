import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Satistic = ()=>{
    return (
        <View style={styles.container}>
            <Text>
                Satistic
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

export default Satistic