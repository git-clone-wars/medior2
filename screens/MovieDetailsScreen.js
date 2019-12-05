/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button } from 'react-native'
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#212730',
        }}
      >
        <Card title={`${movie.title} (${movie.date})`} image={movie.poster}>
          <Text style={{ marginBottom: 10 }}>{movie.overview}</Text>
        </Card>
        <Button
          title='Add to your lists!'
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
      </View>
    )
  }
}
