/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button } from 'react-native'

export default class BookDetails extends React.Component {
  render() {
    const { navigation } = this.props
    const book = navigation.getParam('book')
    console.log(book)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Is this the book? {book.title} </Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title='Dismiss'
        />
      </View>
    )
  }
}
