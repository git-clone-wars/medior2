import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  SectionList,
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

import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core'
// import Typography from '@material-ui/core/Typography';

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
    const allData = [...this.state.movieResults, this.state.bookResults]

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

    const MovieList = [
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

    const classes = useStyles()
    return (
      <SafeAreaView>
        <SectionList
          sections={[
            {
              category: 'Movies',
              data: [movieList],
              renderItem: ({ item, index, section: { category, data } }) => (
                <Text>{item.name}</Text>
              ),
            },
            {
              category: 'Books',
              data: [bookList],
              renderItem: ({ item, index, section: { category, data } }) => (
                <Text>{item.name}</Text>
              ),
            },
          ]}
          // renderItem={({ item,  }) => ( )}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    )
  }
}

function smallIcon() {
  return <MaterialCommunityIcons name='meteor' size={32} color='#a33f34' />
}

function movieCard(item) {
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          classname={classes.media}
          image={`http://image.tmdb.org/t/p/original/${item.poster_path}`}
          title='movie poster'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {`${item.title}(${item.release_date.slice(4)})`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          ADD
        </Button>
      </CardActions>
    </Card>
  )
}

function bookCard(item) {
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          classname={classes.media}
          image={item.volumeInfo.imageLinks.thumbnail}
          title='book poster'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {`${item.volumeInfo.title}(${item.volumeInfo.publishedDate})`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          ADD
        </Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})
