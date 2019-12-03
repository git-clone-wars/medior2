import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Tile } from 'react-native-elements'

const bookList = [
  {
    volumeInfo: {
      imageLinks: {
        thumbnail:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      },
      publishedDate: 1999,
      authors: ['Neil Gaiman'],
      title: 'American Gods',
    },
    id: 6,
  },
  {
    volumeInfo: {
      imageLinks: {
        thumbnail:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      },
      publishedDate: 1847,
      authors: ['Charlotte Bronte'],
      title: 'Jane Eyre',
    },
    id: 9,
  },
]

const movieList = [
  {
    title: 'Interstellar',
    poster_path: '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
    release_date: 2014,
    id: 7,
  },
  {
    title: 'The Lighthouse',
    poster_path: '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
    release_date: 2019,
    id: 12,
  },
]


const CurrentlyWatching = () => (
  <View style={[styles.scene, { backgroundColor: '#212730' }]}>
    <Text>Movies</Text>
    {movieList.map((movie) => {
      return (
        <Tile key={movie.id} image={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} />
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});


export default CurrentlyWatching
