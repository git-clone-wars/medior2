import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FirebaseWrapper from '../firebase/firebase'


export default class AuthLoadingScreen extends Component {
  async componentDidMount() {
    const auth = await FirebaseWrapper.getInstance().auth()
    console.log(auth)
    this.props.navigation.navigate(auth.currentUser ? 'App' : 'Auth');

  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        {/* <ActivityIndicator /> */}
        <Text>Loading</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
