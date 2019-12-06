/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button, SafeAreaView, ScrollView } from 'react-native'
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
          <Card
            containerStyle={{ padding: 20, flex: 1 }}
            title={`${movie.title} (${movie.date})`}
            image={{ uri: `http://image.tmdb.org/t/p/original${movie.poster}` }}
            imageStyle={{
              width: hp('16.7%'),
              height: hp('25%'),
            }}
          >
            <Text style={{ marginBottom: 10 }}>{movie.overview}</Text>
          </Card>
          <Button
            title='Add to Lists'
            onPress={() => {
              this.setState({ modalVisible: true })
            }}
          />
          <Button
            onPress={() => this.props.navigation.goBack()}
            title='Dismiss'
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
