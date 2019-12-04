import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import FirebaseWrapper from '../firebase/firebase'

export default function Test() {
  const book = {
    title: 'Harry Potter',
    isbn: '12345',
    author: 'JK Rowling',
    year: '1995',
  }

  const sendBookFunc = (book, listType) => {
    console.log('clicked!')
    FirebaseWrapper.getInstance()
  }

  return (
    <View>
      <Button title='click!' onPress={() => sendBookFunc(book, 'completed')} />
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
