import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import Test from '../screens/Test'

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Test: Test,
    },
    {
      initialRouteName: 'Main',
    }
  )
)
