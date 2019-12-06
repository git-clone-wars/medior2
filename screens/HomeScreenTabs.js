import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { ListItem, List } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import FirebaseWrapper from '../firebase/firebase'
import { withNavigationFocus } from 'react-navigation'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const seeAllMovieImg = require('../assets/images/seeallmovies.png')
const seeAllBooksImg = require('../assets/images/seeAllBooks.png')
const seeAllTVImg = require('../assets/images/seeAllTV.png')

class HomeScreenTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {},
    }
  }

  componentDidMount() {
    try {
      const { navigation } = this.props

      this.focusListener = navigation.addListener('didFocus', async () => {
        const fetchedList = await FirebaseWrapper.getInstance().getListsByStatus(
          this.props.tabName
        )
        if (fetchedList) {
          this.setState({
            category: fetchedList,
          })
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    let listOfMovies = []
    let topFour = []
    if (this.state.category.movie) {
      listOfMovies = Object.values(this.state.category.movie)
      topFour = listOfMovies.slice(0, 3)
      topFour.push({ seeAll: seeAllMovieImg, id: 0 })
    }
    let listOfBooks = []
    if (this.state.category.book) {
      listOfBooks = Object.values(this.state.category.book)
      topFour = listOfMovies.slice(0, 3)
      topFour.push({ seeAll: seeAllBooksImg, id: 0 })
    }
    let listOfTvShows = []
    if (this.state.category.tvShow) {
      listOfTvShows = Object.values(this.state.category.tvShow)
    }

    return (
      <View style={[styles.scene, { backgroundColor: '#212730' }]}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SeeAllScreen', {
              movies: listOfMovies,
            })
          }
        >
          <Text style={{ color: '#a33f34' }}>See All Movies</Text>
        </TouchableOpacity>
        <FlatList
          data={topFour}
          horizontal={true}
          containerStyle={{
            borderBottomWidth: 3,
            backgroundColor: '#104f55',
          }}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('MovieDetailsScreen', {
                    movie: item,
                  })
                }
              >
                <Image
                  style={styles.imageThumbnail}
                  source={{
                    uri: `http://image.tmdb.org/t/p/original${item.poster}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item['id'].toString()}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SeeAllScreen', {
              books: listOfBooks,
            })
          }
        >
          <Text style={{ color: '#a33f34' }}>See All Books</Text>
        </TouchableOpacity>
        <FlatList
          data={listOfBooks}
          horizontal={true}
          containerStyle={{
            borderBottomWidth: 3,
            backgroundColor: '#104f55',
          }}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('BookDetailsScreen', {
                    book: item,
                  })
                }
              >
                <Image
                  style={styles.imageThumbnail}
                  source={{
                    uri: item.thumbnail,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.ISBN}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SeeAllScreen', {
              tvShows: listOfTvShows,
            })
          }
        >
          <Text style={{ color: '#a33f34' }}>See All TV Shows</Text>
        </TouchableOpacity>
        <FlatList
          data={listOfTvShows}
          horizontal={true}
          containerStyle={{
            borderBottomWidth: 3,
            backgroundColor: '#104f55',
          }}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('BookDetailsScreen', {
                    book: item,
                  })
                }
              >
                <Image
                  style={styles.imageThumbnail}
                  source={{
                    uri: item.thumbnail,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('25%'),
    width: hp('16.7%'),
  },
})

export default withNavigationFocus(HomeScreenTabs)
