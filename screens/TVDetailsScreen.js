/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button, SafeAreaView, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import AddToListModal from '../components/AddToList'

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
          <Card
            containerStyle={{ padding: 20, flex: 1 }}
            title={`${tv['titleDate']}`}
            image={{ uri: `http://image.tmdb.org/t/p/original${tv.poster}` }}
            imageStyle={{
              width: 200,
              height: 275,
              // resizeMode: 'cover',
              borderRadius: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ marginBottom: 10 }}>{tv.overview}</Text>
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
            mediaType={'tvShow'}
            item={tv}
            toggleModal={this.toggleModal}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
