import { movie_api } from '../secrets'
import axios from 'axios'

export const tvSearch = async query => {
  try {
    console.log('tryingToSearch')
    if (query.length > 0) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${movie_api}&language=en-US&query=${query}&page=1`
      )
      console.log(data)
      return data
    }
  } catch (error) {
    console.log('failed TV search:', error)
  }
}

export const sanitizeTVData = result => {
  const formattedQuery = {}

  formattedQuery['poster'] = result.poster_path

  formattedQuery['id'] = result.id

  formattedQuery['title'] = result.name

  formattedQuery['overview'] = result.overview

  if (result.first_air_date.length > 5) {
    formattedQuery['airDate'] = result.first_air_date.slice(0, 4)
  } else {
    formattedQuery['airDate'] = result.first_air_date
  }

  return formattedQuery
}
