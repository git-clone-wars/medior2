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
    return (
      <View>
        <Button
          title='click!'
          onPress={() => {
            this.setState({ modalVisible: true })
          }}
        />

        <Button
          title='getMediaByStatus'
          onPress={async () => {
            const lists = await FirebaseWrapper.getInstance().getListsByStatus(
              'onHold'
            )
          }}
        />
        <Button
          title='getMediaByType'
          onPress={async () => {
            const lists = await FirebaseWrapper.getInstance().getListsByMedia(
              'book'
            )
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
