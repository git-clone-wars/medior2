import { booksAPIKey } from '../secrets'
import axios from 'axios'

export const isbnScanSearch = async query => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${booksAPIKey}`
    )
    return data
  } catch (error) {
    console.error(error)
  }
}

export const bookSearch = async query => {
  try {
    if (query.length > 0) {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${booksAPIKey}`
      )
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export const sanitizeBookData = item => {
  const formattedQuery = {}
  formattedQuery['authors'] = item.volumeInfo.authors
    ? item.volumeInfo.authors
    : ['Anonymous']
  // authors is an array

  formattedQuery['title'] = item.volumeInfo.title

  formattedQuery['publishedDate'] = item.volumeInfo.publishedDate
    ? item.volumeInfo.publishedDate
    : ''

  if (formattedQuery['publishedDate'].length > 5) {
    formattedQuery['publishedDate'] = item.volumeInfo.publishedDate.slice(0, 4)
  }

  formattedQuery['categories'] = item.volumeInfo.categories
  // an array

  formattedQuery['longDesc'] = item.volumeInfo.description
    ? item.volumeInfo.description
    : ''
  // longer description

  formattedQuery['ISBN'] = item.volumeInfo.industryIdentifiers[0].identifier

  formattedQuery['thumbnail'] =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
      ? item.volumeInfo.imageLinks.thumbnail
      : 'https://tinyurl.com/vuvlh4g'

  return formattedQuery
}
