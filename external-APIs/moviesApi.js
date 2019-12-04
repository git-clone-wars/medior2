import { movie_api } from '../secrets'
import axios from 'axios'

export const movieSearch = async query => {
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

export const sanitizeMovieData = result => {
  const formattedQuery = {}

  formattedQuery['poster'] = result.poster_path

  formattedQuery['id'] = result.id

  formattedQuery['title'] = result.title

  formattedQuery['overview'] = result.overview

  if (result.release_date.length > 5) {
    formattedQuery['releaseDate'] = result.release_date.slice(0, 4)
  } else {
    formattedQuery['releaseDate'] = result.release_date
  }

  return formattedQuery
}

// from movies
// poster, id, title, overview, releasedate,
