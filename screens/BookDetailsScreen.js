/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button, SafeAreaView, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import AddToListModal from '../components/AddToList'

export default class BookDetails extends React.Component {
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
    const book = navigation.getParam('book')
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
            title={`${book.title} by ${book.authors[0]}`}
            image={{ uri: book.thumbnail }}
            imageStyle={{
              width: 200,
              height: 275,
              // resizeMode: 'cover',
              borderRadius: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ marginBottom: 10 }}>{book.longDesc}</Text>
          </Card>
          <Button
            title='Add to your lists!'
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
            mediaType={'book'}
            item={book}
            toggleModal={this.toggleModal}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
