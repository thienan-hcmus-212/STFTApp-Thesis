import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const Test =()=>{
    return (
        <View style={styles.container}>
            <Text>123456</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Test
