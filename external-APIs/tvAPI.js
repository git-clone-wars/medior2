import { movie_api } from '../secrets'
import axios from 'axios'

export const tvSearch = async query => {
  try {
    if (query.length > 0) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${movie_api}&language=en-US&query=${query}&page=1`
      )

      return data
    }
  } catch (error) {
    console.error('failed TV search:', error)
  }
}

export const sanitizeTVData = result => {
  if (result.name === 'undefined') {
    return
  } else {
    const formattedQuery = {}

    formattedQuery['poster'] = result.poster_path

    formattedQuery['id'] = result.id

    formattedQuery['title'] = result.name

    formattedQuery['overview'] = result.overview

    formattedQuery['date'] = result.first_air_date ? result.first_air_date : ''

    if (formattedQuery['date'].length > 5) {
      formattedQuery['date'] = result.first_air_date.slice(0, 4)
    }

    formattedQuery['titleDate'] = formattedQuery['date'].length
      ? `${formattedQuery['title']} (${formattedQuery['date']})`
      : formattedQuery['title']

    return formattedQuery
  }
}
