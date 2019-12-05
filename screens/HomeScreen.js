import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions, SafeAreaView
} from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreenTabs from './HomeScreenTabs'


export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'eye' },
        { key: 'checkbox-marked-outline' },
        { key: 'clipboard-text' },
        { key: 'pause-circle' },
        { key: 'close-outline' },
      ],
    };
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'eye':
              return <HomeScreenTabs tabName={'current'} />
            case 'checkbox-marked-outline':
              return <HomeScreenTabs tabName={'completed'} />
            case 'clipboard-text':
              return <HomeScreenTabs tabName={'planTo'} />
            case 'pause-circle':
              return <HomeScreenTabs tabName={'onHold'} />
            case 'close-outline':
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
          inactiveColor='#CCCCCC'
          indicatorStyle={{ backgroundColor: '#a33f34' }}
          renderIcon={({ route, focused, color }) => (
            <Icons
              name={route.key}
              color={color}
              size={22}
            />
          )}
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

