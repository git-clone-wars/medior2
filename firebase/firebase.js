import * as firebase from 'firebase'
import axios from 'axios'

import 'firebase/database'

export default class FirebaseWrapper {
  constructor() {
    this.initialized = false
    this._firebaseInstance = null // instance of our npm package
    //this._firebaseWrapperInstance = null // instance of our wrapper
    this._database = null
  }

  initialize(config) {
    if (!this.initialized) {
      // initialize firebase
      this._firebaseInstance = firebase.initializeApp(config)
      this._database = firebase.database()
      this.initialized = true

      console.log('FIREBASE initialized, woohoo!')
    }
  }

  static getInstance() {
    // how we're going to refer to this class outside of our wrapper
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper()
    }
    return this._firebaseWrapperInstance
  }

  signInEmailPassword(email, password) {
    try {
      this._firebaseInstance.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      var errorCode = error.code
      var errorMessage = error.message
      console.error('Trouble signing in ?', errorCode, errorMessage)
    }
  }

  signOut() {
    try {
      this._firebaseInstance.auth().signOut()
    } catch (error) {
      console.error('Trouble signing out ?', error)
    }
  }

  async wrapperAuth() {
    try {
      const auth = await this._firebaseInstance.auth()
      return auth
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async wrapperOnAuthStateChanged(callback) {
    return await this._firebaseInstance.auth().onAuthStateChanged(callback)
  }

  async createUserEmailPassword(email, password) {
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      await this._firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(email, password)
    } catch (error) {
      var errorCode = error.code
      var errorMessage = error.message
      console.error('Trouble signing up ?', errorCode, errorMessage)
    }
  }

  async addMedia(mediaType, listType, item) {
    try {
      if (!mediaTypes.includes(mediaType)) {
        throw 'Not a valid media type!'
      }
      if (!listTypes.includes(listType)) {
        throw 'Not a valid list type!'
      }
      const uid = this._firebaseInstance.auth().currentUser.uid
      const capMedia = mediaType[0].toUpperCase() + mediaType.slice(1)
      const pluralMedia = mediaType + 's'
      const capList = listType[0].toUpperCase() + listType.slice(1)
      const id = item.ISBN ? item.ISBN : item.id
      await this._database.ref(`/${pluralMedia}/${id}`).set(item)
      await this._database
        .ref(`users${capMedia}Lists/${uid}/${listType}/${id}`)
        .set(item)
      await this._database
        .ref(`user${capList}/${uid}/${mediaType}/${id}`)
        .set(item)
    } catch (error) {
      console.error('problem adding media:', error)
    }
  }

  async getListsByStatus(listType) {
    try {
      const uid = this._firebaseInstance.auth().currentUser.uid
      if (!listTypes.includes(listType)) throw 'not a valid list type'
      const colName = 'user' + listType[0].toUpperCase() + listType.slice(1)
      const lists = await axios.get(
        `https://gitclonewars.firebaseio.com/${colName}/${uid}.json`
      )
      return lists.data
    } catch (error) {
      console.error('problem getting lists:', error)
    }
  }
  async getListsByMedia(mediaType) {
    try {
      const uid = await this._firebaseInstance.auth().currentUser.uid
      if (!mediaTypes.includes(mediaType)) throw 'not a valid media type'
      const colName =
        'users' + mediaType[0].toUpperCase() + mediaType.slice(1) + 'Lists'
      const lists = await axios.get(
        `https://gitclonewars.firebaseio.com/${colName}/${uid}.json`
      )
      return lists.data
    } catch (error) {
      console.error('problem getting lists:', error)
    }
  }
}

const mediaTypes = ['book', 'movie', 'tvShow']
const listTypes = ['current', 'completed', 'planTo', 'onHold', 'dropped']

//FirebaseWrapper.getInstance().addMedia('book', 'completed', { isbn: 123 })
