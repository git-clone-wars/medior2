/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { isbnScanSearch, sanitizeBookData } from '../external-APIs/booksApi'

export default class Scanner extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
  }

  state = {
    hasCameraPermission: null,
    scanned: false,
  }

  componentDidMount() {
    this.getPermissionsAsync()
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  render() {
    const { hasCameraPermission, scanned } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <BarCodeScanner //button to scan?
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    )
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true })
    try {
      const foundBook = await isbnScanSearch(data)

      const sanitizedBookInfo = sanitizeBookData(foundBook.items[0])

      if (sanitizedBookInfo) {
        this.props.navigation.navigate('BookDetailsScreen', { book: sanitizedBookInfo })
      }
    } catch (error) {
      console.log(`sorry not found ${error}`)
    }
  }
}
