import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default class SeeAll extends React.Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem({ item }) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (this.props) {
              if (item.type === 'book') {
                this.props.navigation.navigate('BookDetailsScreen', {
                  book: item,
                })
              } else if (item.type === 'movie') {
                this.props.navigation.navigate('MovieDetailsScreen', {
                  movie: item,
                })
              } else if (item.type === 'tvShow') {
                this.props.navigation.navigate('TVDetailsScreen', {
                  tv: item,
                })
              }
            }
          }}
        >
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
    const type = movies ? 'movie' : books ? 'book' : tvShows ? 'tvShow' : ''
    media.map((item, index) => (item.key = index.toString()))
    media.map((item, index) => {
      item.imageSource = item.poster
        ? `http://image.tmdb.org/t/p/original${item.poster}`
        : item.thumbnail
      item.key = index.toString()
      item.type = type
    })

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
    margin:
      (wp('100%') - Math.floor(wp('100%') / hp('16.7%')) * hp('16.7')) /
      (Math.floor(wp('100%') / hp('16.7%') + 1) * 2),
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
  },
})
