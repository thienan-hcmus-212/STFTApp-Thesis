import React, { useState } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableHighlight, StatusBar, Alert, Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { applyMiddleware } from 'redux';
import MapView from 'react-native-maps';

const Test = () => {

    return (
        <View style={styles.container}>
      <MapView style={styles.map} />
    </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
})

export default Test
