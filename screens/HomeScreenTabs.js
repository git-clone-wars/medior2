import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import FirebaseWrapper from '../firebase/firebase'
import { withNavigationFocus } from 'react-navigation'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'


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
    let topFourMovies = []
    if (this.state.category.movie) {
      listOfMovies = Object.values(this.state.category.movie)
      topFourMovies = listOfMovies.slice(0, 3)
    }
    let listOfBooks = []
    let topFourBooks = []
    if (this.state.category.book) {
      listOfBooks = Object.values(this.state.category.book)
      topFourBooks = listOfBooks.slice(0, 3)
    }
    let listOfTvShows = []
    let topFourTvShows = []
    if (this.state.category.tvShow) {
      listOfTvShows = Object.values(this.state.category.tvShow)
      topFourTvShows = listOfTvShows.slice(0, 3)
    }

    return (
      <ScrollView style={[styles.scene, { backgroundColor: '#212730' }]}>
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
          data={topFourMovies}
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
          data={topFourBooks}
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
          keyExtractor={item => item.ISBN.toString()}
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
          data={topFourTvShows}
          horizontal={true}
          containerStyle={{
            borderBottomWidth: 3,
            backgroundColor: '#104f55',
          }}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('TVDetailsScreen', {
                    tv: item,
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
      </ScrollView>
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
