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
    console.log('failed movie search:', error)
  }
}

export const sanitizeMovieData = result => {
  const formattedQuery = {}

  formattedQuery['poster'] = result.poster_path

  formattedQuery['id'] = result.id

  formattedQuery['title'] = result.title

  formattedQuery['overview'] = result.overview

  formattedQuery['date'] = result.release_date ? result.release_date : ''

  if (formattedQuery['date'].length > 5) {
    formattedQuery['date'] = result.release_date.slice(0, 4)
  }

  formattedQuery['titleDate'] = formattedQuery['date'].length
    ? `${formattedQuery['title']} (${formattedQuery['date']})`
    : formattedQuery['title']

  return formattedQuery
}

// from movies
// poster, id, title, overview, date, titleDate
