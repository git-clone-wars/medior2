import * as React from 'react'
import {
  Text,
  View,
  Button,
  SectionList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { SearchBar, List, ListItem } from 'react-native-elements'
import movieSearch from '../external-APIs/moviesApi'
import { bookSearch } from '../external-APIs/booksApi'
import _ from 'lodash'

import { TabView, SceneMap } from 'react-native-tab-view'

import SearchTabs from './SearchTabs'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      movieResults: [],
      bookResults: [],
    }
  }

  handleSearch = query => {
    this.setState({ query }, () => this.fetchData())
    // initialize/reset set timeout (callback, will call fetchdata)
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginLeft: '0%',
        }}
      />
    )
  }

  fetchData = _.debounce(() => {
    movieSearch(this.state.query)
      .then(responseJson => {
        // console.log(responseJson.results)
        this.setState({
          movieResults: [...responseJson.results],
        })
      })
      .catch(error => {
        console.log(error) //to catch the errors if any
      })
    bookSearch(this.state.query)
      .then(responseJson => {
        console.log('THE LENGTH OF THE RESULT ITEMS', responseJson.items.length)
        this.setState({
          bookResults: [...responseJson.items],
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, 1000)

  render() {
    // const allData = [...this.state.movieResults, this.state.bookResults]

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

    return (
      <SafeAreaView>
        <SearchBar
          placeholder='Search Movies and Books...'
          onChangeText={this.handleSearch}
          searchIcon={smallIcon()}
          autoCorrect={true}
          value={this.state.query}
          darkTheme
          round
        />
        <SearchTabs
          movies={this.state.movieResults}
          books={this.state.bookResults}
        />
      </SafeAreaView>
    )
  }
}

function smallIcon() {
  return <MaterialCommunityIcons name='meteor' size={32} color='#a33f34' />
}
