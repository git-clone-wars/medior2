import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native'

import { TabView, SceneMap } from 'react-native-tab-view'

import CurrentlyWatching from './CurrentlyWatching'


const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#212730' }]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#212730' }]} />
);

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#212730' }]} />
);

const FifthRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#212730' }]} />
);

export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Currenty Watching' },
        { key: 'second', title: 'Completed' },
        { key: 'third', title: 'Plan to Watch' },
        { key: 'fourth', title: 'On Hold' },
        { key: 'fifth', title: 'Dropped' },
      ],
    };
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: CurrentlyWatching,
          second: SecondRoute,
          third: ThirdRoute,
          fourth: FourthRoute,
          fifth: FifthRoute
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />

    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
