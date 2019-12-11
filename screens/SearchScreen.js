import * as React from 'react'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'
import { movieSearch, sanitizeMovieData } from '../external-APIs/moviesApi'
import { bookSearch, sanitizeBookData } from '../external-APIs/booksApi'
import { tvSearch, sanitizeTVData } from '../external-APIs/tvAPI'

import _ from 'lodash'

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
  static navigationOptions = {
    title: 'Search',
    headerTintColor: '#CCCCCC',
    headerStyle: {
      backgroundColor: '#212730',
    },
  }
  handleSearch = query => {
    this.setState({ query }, () => this.fetchData())
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
    if (this.state.query.length === 0) {
      return []
    }
    movieSearch(this.state.query)
      .then(res => {
        const formattedM = res.results.map(result => {
          return sanitizeMovieData(result)
        })

        this.setState({
          movieResults: [...formattedM],
        })
      })
      .catch(error => {
        console.error(error) //to catch the errors if any
      })
    bookSearch(this.state.query)
      .then(responseJson => {
        const formattedB = responseJson.items.map(item => {
          return sanitizeBookData(item)
        })

        this.setState({
          bookResults: [...formattedB],
        })
      })
      .catch(error => {
        console.error(error)
      })
    tvSearch(this.state.query)
      .then(resJson => {
        const formattedT = resJson.results.map(result => {
          return sanitizeTVData(result)
        })

        this.setState({
          tvResults: [...formattedT],
        })
      })
      .catch(error => {
        console.error(error) //to catch the errors if any
      })
  }, 1000)

  render() {
    return (
      <View style={{ flex: 1 }}>
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
      </View>
    )
  }
}

function smallIcon() {
  return <MaterialCommunityIcons name='meteor' size={32} color='#a33f34' />
}
