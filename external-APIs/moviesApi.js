import { movie_api } from '../secrets'
import axios from 'axios'

const movieSearch = async query => {
  console.log('API HAS BEEN CALLED', query)
  try {
    if (query.length > 0) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${movie_api}&query=${query}`
      )

      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export default movieSearch

// movie book formatting

// movie (has id)
//poster: `http://image.tmdb.org/t/p/original/${movie.poster_path}`
//title: movie.title
// released: movie.release_date

//overview: movie.overview

// book (has id)
// poster: book.volumeInfo.imageLinks.thumbnail
// title: book.volumeInfo.title
// author(s): book.volumeInfo.authors (will have to be mapped through )
//released: book.volumeInfo.publishedDate

//overview: book.volumeInfo.description

// APPROACH?
// multiple flat lists, map through two different data sets (From state)
