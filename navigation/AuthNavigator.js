import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import SignUpLogin from '../screens/SignUp-Login'
import MainTabNavigator from './MainTabNavigator'

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: SignUpLogin,
      Main: MainTabNavigator,
    },
    {
      initialRouteName: 'Auth',
    }
  )
)
