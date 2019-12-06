import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default class SeeAll extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>See All</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('25%'),
    width: hp('16.7%'),
  },
})
