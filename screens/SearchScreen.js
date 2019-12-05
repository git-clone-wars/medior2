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
import { movieSearch, sanitizeMovieData } from '../external-APIs/moviesApi'
import { bookSearch, sanitizeBookData } from '../external-APIs/booksApi'
import { tvSearch, sanitizeTVData } from '../external-APIs/tvAPI'

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
      tvResults: [],
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
      .then(res => {
        // console.log(responseJson.results.length, 'movies returned')
        const formattedM = res.results.map(result => {
          return sanitizeMovieData(result)
        })

        this.setState({
          movieResults: [...formattedM],
        })
      })
      .catch(error => {
        console.log(error) //to catch the errors if any
      })
    bookSearch(this.state.query)
      .then(responseJson => {
        // console.log(responseJson.items.length, 'books returned')

        const formattedB = responseJson.items.map(item => {
          return sanitizeBookData(item)
        })

        this.setState({
          bookResults: [...formattedB],
        })
      })
      .catch(error => {
        console.log(error)
      })
    tvSearch(this.state.query)
      .then(resJson => {
        // console.log(responseJson.results.length, 'TV shows returned')
        const formattedT = resJson.results.map(result => {
          return sanitizeTVData(result)
        })

        this.setState({
          tvResults: [...formattedT],
        })
      })
      .catch(error => {
        console.log(error) //to catch the errors if any
      })
  }, 1000)

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar
          placeholder='Search Movies, Books, TV Shows...'
          onChangeText={this.handleSearch}
          searchIcon={smallIcon()}
          autoCorrect={true}
          value={this.state.query}
          darkTheme
          round
        />
        <SearchTabs
          detailsNav={this.props.navigation}
          movies={this.state.movieResults}
          books={this.state.bookResults}
          tv={this.state.tvResults}
        />
      </SafeAreaView>
    )
  }
}

function smallIcon() {
  return <MaterialCommunityIcons name='meteor' size={32} color='#a33f34' />
}
