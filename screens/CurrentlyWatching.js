import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { ListItem, List } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import FirebaseWrapper from '../firebase/firebase'
import { withNavigationFocus } from 'react-navigation'


class CurrentlyWatching extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: {},
    }
  }

  componentDidMount() {
    try {
      const { navigation } = this.props

      this.focusListener = navigation.addListener('didFocus', async () => {
        const fetchedCurrent = await FirebaseWrapper.getInstance().getListsByStatus(
          'current')
        this.setState({
          current: fetchedCurrent,
        })
      })


    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let listOfMovies = []
    if (this.state.current.movie) {
      listOfMovies = Object.values(this.state.current.movie)
    } else {
      listOfMovies = []
    }

    return (
      <View style={[styles.scene, { backgroundColor: '#212730' }]}>
        <FlatList
          data={listOfMovies}
          horizontal={false}
          containerStyle={{
            borderBottomWidth: 0,
            backgroundColor: '#104f55',
          }}
          renderItem={({ item }) => (
            <ListItem
              subtitle={item.title}
              leftAvatar={{
                rounded: false,
                size: 'large',
                source: {
                  uri: `http://image.tmdb.org/t/p/original${item.poster}`,
                },
              }}
              button
              onPress={() => this.props.navigation.navigate('MovieDetailsScreen', { movie: item })}
            />
          )}
          keyExtractor={item => item['id'].toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
})

export default withNavigationFocus(CurrentlyWatching)
