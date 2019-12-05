/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

//components

import { MaterialCommunityIcons } from '@expo/vector-icons'

//screens
import HomeScreen from '../screens/HomeScreen'
import ScannerScreen from '../screens/ScannerScreen'
import BookDetails from '../screens/BookDetailsScreen'
import MovieDetails from '../screens/MovieDetailsScreen'
import TVDetails from '../screens/TVDetailsScreen'
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
      size={35}
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
    <MaterialCommunityIcons
      focused={focused}
      name='barcode-scan'
      color='#a33f34'
      size={32}
    />
  ),
}

ScannerStack.path = ''

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    BookDetailsScreen: BookDetails,
    MovieDetailsScreen: MovieDetails,
    TVDetailsScreen: TVDetails,
  },
  config
)

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      focused={focused}
      name='magnify'
      color='#a33f34'
      size={32}
    />
  ),
}

SearchStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    SearchStack,
    ScannerStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#8bf6f5',
      inactiveTintColor: '#393e46',
      activeBackgroundColor: '#212730',
      inactiveBackgroundColor: '#212730',
    },
  }
)

tabNavigator.path = ''

export default tabNavigator
