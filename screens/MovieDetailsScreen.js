/* eslint-disable no-console */
import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { Card } from 'react-native-elements'

export default class MovieDetails extends React.Component {
  render() {
    const { navigation } = this.props
    const movie = navigation.getParam('movie')
    console.log(movie)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#212730' }}>
        <Card
          title={`${movie.title} (${movie.releaseDate})`}
          image={movie.poster}>
          <Text style={{ marginBottom: 10 }}>
            {movie.overview}
          </Text>
        </Card>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title='Dismiss'
        />
      </View>
    )
  }
}

