import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignUpLogin from '../screens/SignUp-Login'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: SignUpLogin
  },
  {
    initialRouteName: 'AuthLoading'
  })
);
