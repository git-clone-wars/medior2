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

export default class MovieDetails extends React.Component {
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
    const movie = navigation.getParam('movie')
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
            <View
              style={{ paddingBottom: 15, padding: 20, alignSelf: 'center' }}
            >
              <Text
                style={{
                  color: '#CCCCCC',
                  marginBottom: 20,
                  textAlign: 'center',
                }}
              >
                {`${movie.title} (${movie.date})`}
              </Text>
            </View>

            <Image
              source={{
                uri: `http://image.tmdb.org/t/p/original${movie.poster}`,
              }}
              style={{
                height: hp('35%'),
                width: hp('24%'),
                alignSelf: 'center',
                bottom: 20,
              }}
            />
          </View>

          <View
            style={{
              padding: 20,
            }}
          >
            <Text style={{ marginBottom: 10, color: '#CCCCCC' }}>
              Summary: {movie.overview}
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
            mediaType={'movie'}
            item={movie}
            toggleModal={this.toggleModal}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
