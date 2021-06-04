import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ShowRoute = (props)=>{

    const renderItemRoute = ()=>{
        return (
            <View>
                
            </View>
        )
    }

    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        margin: 20,
        backgroundColor:'blue',
        width: '70%',
        height:'90%'
    }
})

export default ShowRoute