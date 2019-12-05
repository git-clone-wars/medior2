import * as React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { ListItem } from 'react-native-elements'

export default class SearchTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'mov', title: 'Movies' },
        { key: 'book', title: 'Books' },
        { key: 'tv', title: 'Television' },
      ],
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '86%',
          backgroundColor: '#212730',
          marginLeft: '14%',
        }}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'mov':
                return (
                  <MovieResults
                    movies={this.props.movies}
                    detailsNav={this.props.detailsNav}
                  />
                )
              case 'book':
                return (
                  <BookResults
                    books={this.props.books}
                    detailsNav={this.props.detailsNav}
                  />
                )
              case 'tv':
                return (
                  <TVResults
                    tv={this.props.tv}
                    detailsNav={this.props.detailsNav}
                  />
                )
              default:
                return null
            }
          }}
          onIndexChange={index => this.setState({ index: index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => <TabBar
            {...props}
            style={{ backgroundColor: '#212730' }}
            activeColor='#8bf6f5'
            inactiveColor='#CCCCCC'
            indicatorStyle={{ backgroundColor: '#a33f34' }}
          />}
        />
      </View>
    )
  }
}

const MovieResults = props => {
  const { movies } = props
  // this is coming in as an array

  return (
    <View style={[styles.scene, { backgroundColor: '#212730' }]}>
      <FlatList
        data={movies}
        containerStyle={{ borderBottomWidth: 0 }}
        renderItem={({ item }) => (
          <ListItem
            title={`${item['titleDate']}`}
            leftAvatar={{
              rounded: false,
              size: 'large',
              source: {
                uri: `http://image.tmdb.org/t/p/original${item['poster']}`,
              },
            }}
<<<<<<< HEAD
            onPress={() => props.detailsNav.navigate('MovieDetailsScreen', { movie: item })}
=======
            button
            onPress={() =>
              props.detailsNav.navigate('MovieDetailsScreen', { movie: item })
            }
>>>>>>> e6097f8f1a8e2ececc7f9115ca3009d202d7ba9b
          />
        )}
        keyExtractor={item => item['id'].toString()}
        ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  )
}

const BookResults = props => {
  const { books } = props
  // this is coming in as an array
  return (
    <View style={[styles.scene, { backgroundColor: '#212730' }]}>
      <FlatList
        data={books}
        containerStyle={{ borderBottomWidth: 0 }}
        renderItem={({ item }) => (
          <ListItem
            title={`${item['title']} (${item['publishedDate']})`}
            subtitle={`${item['authors']}`}
            leftAvatar={{
              rounded: false,
              size: 'large',
              source: {
                uri: item['thumbnail'],
              },
            }}
<<<<<<< HEAD
            onPress={() => props.detailsNav.navigate('BookDetailsScreen', { book: item })}
=======
            button
            onPress={() =>
              props.detailsNav.navigate('BookDetailsScreen', { book: item })
            }
>>>>>>> e6097f8f1a8e2ececc7f9115ca3009d202d7ba9b
          />
        )}
        keyExtractor={item => item['ISBN'].toString()}
        ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  )
}

const TVResults = props => {
  const { tv } = props
  // this is coming in as an array

  return (
    <View style={[styles.scene, { backgroundColor: '#212730' }]}>
      <FlatList
        data={tv}
        containerStyle={{ borderBottomWidth: 0 }}
        renderItem={({ item }) => (
          <ListItem
            title={`${item['titleDate']}`}
            leftAvatar={{
              rounded: false,
              size: 'large',
              source: {
                uri: `http://image.tmdb.org/t/p/original${item['poster']}`,
              },
            }}
            button
            onPress={() =>
              props.detailsNav.navigate('TVDetailsScreen', { tv: item })
            }
          />
        )}
        keyExtractor={item => item['id'].toString()}
        ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  )
}

// TV ON PRESS
// onPress={() => props.detailsNav.navigate('TVDetailsScreen', { tv: item })}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  poster: {
    width: 40,
    height: 40,
  },
})
