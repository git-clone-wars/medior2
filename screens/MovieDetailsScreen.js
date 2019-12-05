/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button, SafeAreaView, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import AddToListModal from '../components/AddToList'

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
  render() {
    const { navigation } = this.props
    const movie = navigation.getParam('movie')
    console.log(movie)
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
              width: 200,
              height: 275,
              // resizeMode: 'cover',
              borderRadius: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ marginBottom: 10 }}>{movie.overview}</Text>
          </Card>
          <Button
            title='Add to Lists'
            onPress={() => {
              console.log('clicked')
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
