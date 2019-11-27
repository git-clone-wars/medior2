import { movie_api } from '../secrets'
import axios from 'axios'

const movieSearch = async query => {
  try {
    const { data } = axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${movie_api}&query=${query}`
    )

    return data
  } catch (error) {
    console.log(error)
  }
}