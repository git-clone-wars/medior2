/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button } from 'react-native'
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

  render() {
    const { navigation } = this.props
    const book = navigation.getParam('book')
    console.log(book)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#212730',
        }}
      >
        <Card
          title={`${book.title} by ${book.authors[0]}`}
          image={book.thumbnail}
        >
          <Text style={{ marginBottom: 10 }}>{book.longDesc}</Text>
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
          mediaType={'book'}
          item={book}
          toggleModal={this.toggleModal}
        />
      </View>
    )
  }
}

{
  /* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#212730' }}>
<Text style={{ fontSize: 30 }}>Is this the book? {book.title} by {book.authors[0]}</Text>
<Button
  onPress={() => this.props.navigation.goBack()}
  title='Dismiss'
/>
</View> */
}
