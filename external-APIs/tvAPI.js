import { movie_api } from '../secrets'
import axios from 'axios'

export const tvSearch = async query => {
  try {
    // console.log('tryingToSearch')
    if (query.length > 0) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${movie_api}&language=en-US&query=${query}&page=1`
      )
      // console.log(data)
      return data
    }
  } catch (error) {
    console.log('failed TV search:', error)
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

    // console.log('formatted TV result', formattedQuery)
    return formattedQuery
  }
}

export const noUndefined = obj => {
  if (Object.keys(obj).length !== 0) {
    return obj
  }
}

// if (result.first_air_date === '' || result.first_air_date === undefined) {
//   formattedQuery['titleDate'] === result.name
// } else if (result.first_air_date.length > 5) {
//   formattedQuery['titleDate'] = `${
//     result.name
//   } (${result.first_air_date.slice(0, 4)})`
// } else {
//   formattedQuery['titleDate'] = `${result.name} (${result.first_air_date})`
// }
