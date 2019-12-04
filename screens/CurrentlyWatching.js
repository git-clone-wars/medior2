import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { ListItem, List } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import FirebaseWrapper from '../firebase/firebase'

// const bookList = [
//   {
//     volumeInfo: {
//       imageLinks: {
//         thumbnail:
//           'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//       },
//       publishedDate: 1999,
//       authors: ['Neil Gaiman'],
//       title: 'American Gods',
//     },
//     id: 6,
//   },
//   {
//     volumeInfo: {
//       imageLinks: {
//         thumbnail:
//           'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//       },
//       publishedDate: 1847,
//       authors: ['Charlotte Bronte'],
//       title: 'Jane Eyre',
//     },
//     id: 9,
//   },
// ]

// const movieList = [
//   {
//     title: 'Interstellar',
//     poster_path: '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
//     release_date: 2014,
//     id: 7,
//   },
//   {
//     title: 'The Lighthouse',
//     poster_path: '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
//     release_date: 2019,
//     id: 12,
//   },
// ]

export default class CurrentlyWatching extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // needs to pull from fire
      current: {},
    }
  }

  async componentDidMount() {
    try {
      const fetchedCurrent = await FirebaseWrapper.getInstance().getListsByStatus(
        'current'
      )

      this.setState({
        current: fetchedCurrent,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidUpdate() {
    try {
      const fetchedCurrent = await FirebaseWrapper.getInstance().getListsByStatus(
        'current'
      )

      this.setState({
        current: fetchedCurrent,
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log('HERE IS THE CURRENT STATE', this.state.current)
    const listOfMovies = []
    this.state.current.movie &&
      Object.keys(this.state.current.movie).map(id =>
        listOfMovies.push(this.state.current.movie[id])
      )
    console.log('list of movies', listOfMovies)

    return (
      <View style={[styles.scene, { backgroundColor: '#212730' }]}>
        {this.state.current.movie ? (
          <FlatList
            data={listOfMovies}
            horizontal={true}
            containerStyle={{
              borderBottomWidth: 0,
              backgroundColor: '#104f55',
            }}
            renderItem={({ item }) => (
              <ListItem
                subtitle={item.title}
                leftAvatar={{
                  rounded: false,
                  size: 'large',
                  source: {
                    uri: `http://image.tmdb.org/t/p/original${item.poster}`,
                  },
                }}
                button
                onPress={() => console.log('button pressed!')}
              />
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
          />
        ) : (
          <Text textAlign='center' color='white'>
            {' '}
            Add some movies to see your list!{' '}
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
})
