import booksAPIKey from '../secrets'
import axios from 'axios'

export const isbnScanSearch = async isbnNum => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNum}:keyes&key=${booksAPIKey}`
    )
    return data
  } catch (error) {
    console.log(error)
  }
}
