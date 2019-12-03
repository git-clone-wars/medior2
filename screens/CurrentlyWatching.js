import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { ListItem, List } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'

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
    <FlatList
      data={movieList}
      horizontal={true}
      containerStyle={{ borderBottomWidth: 0 }}
      renderItem={({ item }) => (
        <ListItem
          leftAvatar={{
            rounded: false,
            size: 'large',
            source: {
              uri: `http://image.tmdb.org/t/p/original${item.poster_path}`,
            },
          }}
          button
          onPress={() => console.log('button pressed!')}
        />
      )}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={this.renderSeparator}
    />
  </View>

)

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});


export default CurrentlyWatching
