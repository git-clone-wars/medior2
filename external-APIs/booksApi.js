import booksAPIKey from '../secrets'
import axios from 'axios'

const isbnScanSearch = async isbnNum => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNum}&key=${booksAPIKey}`
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export default isbnScanSearch
