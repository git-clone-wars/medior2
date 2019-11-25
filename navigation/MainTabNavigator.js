/* eslint-disable react/display-name */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen'
import SignUpLogin from '../screens/SignUp-Login'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const ScannerStack = createStackNavigator(
  {
    Scanner: ScannerScreen
  },
  config
)

ScannerStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-barcode' : 'md-barcode'} />
  )
}


const SignUpLoginStack = createStackNavigator(
  {
    Login: SignUpLogin,
  },
  config
);

SignUpLoginStack.navigationOptions = {
  tabBarLabel: 'Log in',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SignUpLoginStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  //LinksStack,
  SignUpLoginStack,
  ScannerStack
});

tabNavigator.path = '';

export default tabNavigator;
