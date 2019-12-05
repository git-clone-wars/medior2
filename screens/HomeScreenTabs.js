import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { ListItem, List } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import FirebaseWrapper from '../firebase/firebase'
import { withNavigationFocus } from 'react-navigation'


class HomeScreenTabs extends React.Component {
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
        const fetchedCurrent = await FirebaseWrapper.getInstance().getListsByStatus(this.props.tabName)
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
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieDetailsScreen', { movie: item })} >
                <Image style={styles.imageThumbnail} source={{ uri: `http://image.tmdb.org/t/p/original${item.poster}` }} />
              </TouchableOpacity>

            </View>
          )}
          keyExtractor={item => item['id'].toString()}
          numColumns={3}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 67
  }
})

export default withNavigationFocus(HomeScreenTabs)
