/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

//components

import TabBarIcon from '../components/TabBarIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'

//screens
import HomeScreen from '../screens/HomeScreen'
import ScannerScreen from '../screens/ScannerScreen'
import BookDetails from '../screens/BookDetailsScreen'
import SearchScreen from '../screens/SearchScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      focused={focused}
      name='meteor'
      size={32}
      color='#a33f34'
    />
  ),
}

HomeStack.path = ''

const ScannerStack = createStackNavigator({
  Scanner: ScannerScreen,
  BookDetailsScreen: BookDetails,
})

ScannerStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-barcode' : 'md-barcode'}
    />
  ),
}

ScannerStack.path = ''

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
)

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
}

SearchStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  ScannerStack,
})

tabNavigator.path = ''

export default tabNavigator
