import React from 'react'
import { View, ImageBackground, StyleSheet, Text } from 'react-native'


import { app } from '../../globals/constants'

// props :
//      size: size of image
//      textSize: 

const LogoApp = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={app.Icon}
                style={{height: props.size, width: props.size}}>
                    <View style={{ flex: 3 }}></View>
                    <Text style={{ flex: 1, ...styles.appName, fontSize: props.textSize }}>{app.Name}</Text>
            </ImageBackground>    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default LogoApp