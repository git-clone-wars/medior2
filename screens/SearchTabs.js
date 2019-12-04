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
                return <MovieResults movies={this.props.movies} />
              case 'book':
                return <BookResults books={this.props.books} />
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
            inactiveColor='#393e46'
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
            title={`${item['title']} (${item['releaseDate']})`}
            leftAvatar={{
              rounded: false,
              size: 'large',
              source: {
                uri: `http://image.tmdb.org/t/p/original${item['poster']}`,
              },
            }}
            button
            onPress={() => console.log('button pressed!')}
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
            button
            onPress={() => console.log('button pressed on', item['title'])}
          />
        )}
        keyExtractor={item => item['ISBN'].toString()}
        ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  poster: {
    width: 40,
    height: 40,
  },
})


