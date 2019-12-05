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

class HomeScreenTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: {},
    }
  }

  componentDidMount() {
    try {
      const { navigation } = this.props

      this.focusListener = navigation.addListener('didFocus', async () => {
        const fetchedCurrent = await FirebaseWrapper.getInstance().getListsByStatus(
          this.props.tabName
        )
        if (fetchedCurrent) {
          this.setState({
            current: fetchedCurrent,
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let listOfMovies = []
    if (this.state.current.movie) {
      listOfMovies = Object.values(this.state.current.movie).slice(0, 3)
    }
    let listOfBooks = []
    if (this.state.current.book) {
      listOfBooks = Object.values(this.state.current.book).slice(0, 3)
    }
    let listOfTvShows = []
    if (this.state.current.tvShow) {
      listOfTvShows = Object.values(this.state.current.book).slice(0, 3)
    }

    return (
      <View style={[styles.scene, { backgroundColor: '#212730' }]}>
        <FlatList
          data={listOfMovies}
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
          keyExtractor={item => item.ISBN}
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
