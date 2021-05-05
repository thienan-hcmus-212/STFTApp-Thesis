import React from 'react'
import { View, StyleSheet } from 'react-native'
import LogoApp from '../Common/logo-app'



const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LogoApp size={200} textSize={24} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default SplashScreen
