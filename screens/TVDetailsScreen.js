/* eslint-disable no-console */
import * as React from 'react'
import {
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native'
import AddToListModal from '../components/AddToList'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

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
          <View style={{ marginTop: 25 }}>
            <View
              style={{ paddingBottom: 15, padding: 20, alignSelf: 'center' }}
            >
              <Text
                style={{
                  color: '#CCCCCC',
                  marginBottom: 20,
                  textAlign: 'center',
                }}
              >
                {`${tv.titleDate}`}
              </Text>
            </View>

            <Image
              source={{ uri: `http://image.tmdb.org/t/p/original${tv.poster}` }}
              style={{
                height: hp('35%'),
                width: hp('24%'),
                alignSelf: 'center',
                bottom: 20,
              }}
            />
            <View
              style={{
                padding: 20,
              }}
            >
              <Text style={{ marginBottom: 10, color: '#CCCCCC' }}>
                Summary: {tv.overview}
              </Text>
            </View>
            <Button
              title='Add to Lists'
              color='#8bf6f5'
              onPress={() => {
                this.setState({ modalVisible: true })
              }}
            />
            <Button
              onPress={() => this.props.navigation.goBack()}
              title='Dismiss'
              color='#8bf6f5'
            />
            <AddToListModal
              visible={this.state.modalVisible}
              mediaType={'tvShow'}
              item={tv}
              toggleModal={this.toggleModal}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
