import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default class SeeAll extends React.Component {
  constructor(props) {
    super(props)
  }
  renderItem({ item }) {
    return (
      <View>
        <TouchableOpacity>
          <Image
            style={styles.imageThumbnail}
            source={{
              uri: item.imageSource,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
  static navigationOptions = {
    headerTintColor: '#CCCCCC',
    headerStyle: {
      backgroundColor: '#212730',
    },
  }

  render() {
    const { navigation } = this.props
    const movies = navigation.getParam('movies')
    const books = navigation.getParam('books')
    const tvShows = navigation.getParam('tvShows')

    const media = movies ? movies : books ? books : tvShows ? tvShows : []
    const detailsScreen = movies
      ? 'MovieDetailsScreen'
      : books
      ? 'BookDetailsScreen'
      : tvShows
      ? 'TVDetailsScreen'
      : ''
    media.map((item, index) => (item.key = index.toString()))
    media.map(
      item =>
        (item.imageSource = item.poster
          ? `http://image.tmdb.org/t/p/original${item.poster}`
          : item.thumbnail)
    )

    return (
      <View style={{ backgroundColor: '#212730', flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.list}
          data={media}
          renderItem={this.renderItem}
          horizontal={false}
          numColumns={Math.floor(wp('100%') / hp('16.7%'))}
          columnWrapperStyle={styles.row}
        ></FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {},
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('25%'),
    width: hp('16.7%'),
  },
  row: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
})
