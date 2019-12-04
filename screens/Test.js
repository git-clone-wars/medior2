import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import FirebaseWrapper from '../firebase/firebase'
import AddToListModal from '../components/AddToList'

export default class Test extends React.Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      mediaType: 'book',
      item: {
        title: 'book for morgan',
        isbn: '098877',
        author: 'JK Rowling',
        year: '1995',
      },
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  render() {
    console.log('test-modalVisible:', this.state.modalVisible)
    return (
      <View>
        <Button
          title='click!'
          onPress={() => {
            console.log('clicked')
            this.setState({ modalVisible: true })
          }}
        />

        <Button
          title='getMediaByStatus'
          onPress={async () => {
            const lists = await FirebaseWrapper.getInstance().getListsByStatus(
              'onHold'
            )
            console.log(lists)
          }}
        />
        <Button
          title='getMediaByType'
          onPress={async () => {
            const lists = await FirebaseWrapper.getInstance().getListsByMedia(
              'book'
            )
            console.log(lists)
          }}
        />

        <AddToListModal
          visible={this.state.modalVisible}
          mediaType={this.state.mediaType}
          item={this.state.item}
          toggleModal={this.toggleModal}
        />
      </View>
    )
  }
}
