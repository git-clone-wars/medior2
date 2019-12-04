import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import FirebaseWrapper from '../firebase/firebase'
import AddToListModal from '../components/AddToList'

export default class Test extends React.Component {
  constructor(){
    super()
    this.state = {
      modalVisible: false,
      mediaType: 'book',
      item: {title: 'Harry Potter',
      isbn: '12345',
      author: 'JK Rowling',
      year: '1995'}
    }
    }


  render()(
    <View>
      <Button title='click!' onPress={() => this.setState({modalVisible: !this.state.modalVisible})} />
      <AddToListModal visible={this.state.modalVisible} mediaType={this.state.mediaType} item={this.state.item} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
