import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {SearchBar} from 'react-native-elements'
import { getArrayHintsFromText } from './src/core/Service/search-location';

export default Test = () => {

  
  return (
    <View style={styles.container}>
      
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
  }
})
