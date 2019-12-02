import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
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

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      movieResults: [],
      bookResults: [],
    }
  }

  // componentDidMount() {
  //   this.fetchData()
  // }

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

  renderHeader = () => {
    return (
      <SearchBar
        placeholder='Search Movies and Books...'
        onChangeText={this.handleSearch}
        searchIcon={smallIcon()}
        autoCorrect={true}
        value={this.state.query}
        darkTheme
        round
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
    const list = [
      {
        name: 'Amy Farha',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        id: 6,
      },
      {
        name: 'Chris Jackson',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        id: 7,
      },
      {
        name: 'Audrey Capstone',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Queen badass',
        id: 8,
      },
      {
        name: 'Leslie Godwin',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Professor Goddess',
        id: 9,
      },
    ]

    return (
      <SafeAreaView>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name}`}
              subtitle={item.subtitle}
              containerStyle={{ borderBottomWidth: 0 }}
              badge={{
                value: plusIcon(),
              }}
            />
          )}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    )
  }
}

function plusIcon() {
  return <MaterialIcons name='library-add' size={10} />
}

// function onIconPress() {
//   console.log('bananas')
// }

function smallIcon() {
  return <MaterialCommunityIcons name='meteor' size={32} color='#a33f34' />
}
