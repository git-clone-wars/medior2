import * as React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { SearchBar } from 'react-native-elements'

export default class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
    }
  }

  updateSearch = search => {
    this.setState({ search })
  }

  render() {
    const { search } = this.state

    return (
      <View>
        <SearchBar
          placeholder='Type Here...'
          onChangeText={this.updateSearch}
          value={search}
        />
      </View>
    )
  }
}
