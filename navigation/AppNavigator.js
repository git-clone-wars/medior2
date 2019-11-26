import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignUp-Login from './'

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: SignUpLogin
  })
);
