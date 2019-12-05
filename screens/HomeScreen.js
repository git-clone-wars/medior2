import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions, SafeAreaView
} from 'react-native'

import { TabView, TabBar } from 'react-native-tab-view'

import HomeScreenTabs from './HomeScreenTabs'


export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Currently Watching' },
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
        renderScene={({ route }) => {
          switch (route.key) {
            case 'first':
              return <HomeScreenTabs tabName={'current'} />
            case 'second':
              return <HomeScreenTabs tabName={'completed'} />
            case 'third':
              return <HomeScreenTabs tabName={'planTo'} />
            case 'fourth':
              return <HomeScreenTabs tabName={'onHold'} />
            case 'fifth':
              return <HomeScreenTabs tabName={'dropped'} />
            default:
              return null
          }
        }}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => <TabBar
          {...props}
          style={{ backgroundColor: '#212730' }}
          activeColor='#8bf6f5'
          inactiveColor='#393e46'
          indicatorStyle={{ backgroundColor: '#a33f34' }}

        />}
      />
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

