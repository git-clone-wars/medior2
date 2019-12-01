import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SearchBar, List, ListItem } from 'react-native-elements'

export default class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
      loading: false,
      // data: [],
      movieResults: [],
      bookResults: [],
    }
  }

  updateSearch = search => {
    this.setState({ search })
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
        onChangeText={this.updateSearch}
        searchIcon={smallIcon()}
        autoCorrect={true}
        darkTheme
        round
      />
    )
  }

  fetchData = async query => {}

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
          // i want data to be the search results
          data={list}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name}`}
              subtitle={item.subtitle}
              containerStyle={{ borderBottomWidth: 0 }}
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

function smallIcon() {
  return <MaterialCommunityIcons name='meteor' size={32} color='#8bf6f5' />
}
