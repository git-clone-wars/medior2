import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import FirebaseWrapper from '../firebase/firebase'

export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    FirebaseWrapper.getInstance().wrapperOnAuthStateChanged(user => {
      console.log('here!')
      this.props.navigation.navigate(user ? 'Main' : 'Auth')
    })
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator /> */}
        <Text>Loading</Text>
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
