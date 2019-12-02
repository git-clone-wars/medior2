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
