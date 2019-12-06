/* eslint-disable no-console */
import * as React from 'react'
import {
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native'
import { Card } from 'react-native-elements'
import AddToListModal from '../components/AddToList'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default class TVDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  static navigationOptions = {
    title: 'Details',
    headerTintColor: '#CCCCCC',
    headerStyle: {
      backgroundColor: '#212730',
    },
  }
  render() {
    const { navigation } = this.props
    const tv = navigation.getParam('tv')
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#212730',
        }}
      >
        <ScrollView
          style={{
            marginHorizontal: 0,
          }}
        >
          <View style={{ marginTop: 50 }}>
            <Image
              source={{ uri: `http://image.tmdb.org/t/p/original${tv.poster}` }}
              style={{
                height: hp('35%'),
                width: hp('24%'),
                alignSelf: 'center',
                bottom: 20,
              }}
            />
            <View
              style={{
                padding: 20,
              }}
            >
              <Text style={{ marginBottom: 10, color: '#CCCCCC' }}>
                Summary: {tv.overview}
              </Text>
            </View>
            <Button
              title='Add to Lists'
              color='#8bf6f5'
              onPress={() => {
                this.setState({ modalVisible: true })
              }}
            />
            <Button
              onPress={() => this.props.navigation.goBack()}
              title='Dismiss'
              color='#8bf6f5'
            />
            <AddToListModal
              visible={this.state.modalVisible}
              mediaType={'tvShow'}
              item={tv}
              toggleModal={this.toggleModal}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

// justifyContent: 'center',
// alignItems: 'center',
// height: hp('25%'),
// width: hp('16.7%'),
// borderRadius: 10,
// justifyContent: 'center',
// flex: 1,
// resizeMode: 'cover',

// containerStyle={{ padding: 20, flex: 0 }}
// title={`${tv['titleDate']}`}
// image={{ uri: `http://image.tmdb.org/t/p/original${tv.poster}` }}
// imageStyle={{
//   height: hp('25%'),
//   width: hp('16.7%'),
//   resizeMode: 'contain',
// }}
