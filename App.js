import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import FirebaseWrapper from './firebase/firebase'
import { firebaseConfig } from './firebase/firebaseConfig'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'

export default class App extends Component {
  constructor() {
    super()
    this.unsubscriber = null
    this.state = {
      user: null,
    }
  }

  async componentDidMount() {
    await FirebaseWrapper.getInstance().initialize(firebaseConfig)
    await loadResourcesAsync()
    this.unsubscriber = await FirebaseWrapper.getInstance().wrapperOnAuthStateChanged(
      user => {
        if (user) {
          this.setState({ user: user })
        }
      }
    )
  }
  s
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber()
    }
  }
  render() {
    console.log('logged in:', !!this.state.user)
    if (this.state.user) {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AppNavigator />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AuthNavigator />
        </View>
      )
    }
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/seeallmovies.png'),
      require('./assets/images/seeAllBooks.png'),
      require('./assets/images/seeAllTV.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212730',
  },
})
