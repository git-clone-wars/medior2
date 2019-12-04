import * as firebase from 'firebase'

import 'firebase/firestore'

export default class FirebaseWrapper {
  constructor() {
    this.initialized = false
    this._firebaseInstance = null // instance of our npm package
    //this._firebaseWrapperInstance = null // instance of our wrapper
    this._firestore = null
  }

  initialize(config) {
    if (!this.initialized) {
      // initialize firebase
      this._firebaseInstance = firebase.initializeApp(config)
      this._firestore = firebase.firestore()
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
      console.log('Trouble signing in ?', errorCode, errorMessage)
    }
  }

  signOut() {
    try {
      this._firebaseInstance.auth().signOut()
    } catch (error) {
      console.log('Trouble signing out ?', error)
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
    // console.log(
    //   this._firebaseInstance
    //     .auth()
    //     .onAuthStateChanged(user => console.log(user))
    // )
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
      console.log('Trouble signing up ?', errorCode, errorMessage)
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
      if (mediaType === 'book') {
        const ref = item.isbn
        this._firestore
          .doc(`/books/${ref}`)
          .get()
          .then(docSnapshot => {
            if (!docSnapshot.exists) {
              this._firestore.collection(`books/${ref}`).set
            }
          })

        this._firebaseInstance.firestore
        this._firebaseInstance.firestore
          .ref(`usersBookLists/${uid}/${listType}/${ref}`)
          .set(item)
        this._firebaseInstance.firestore
          .ref(`userLists/${uid}/${listType}/${mediaType}/${ref}`)
          .set(item)
      }
    } catch (error) {
      console.error('problem adding media:', error)
    }
  }
}

const mediaTypes = ['book', 'movie', 'tvShow']
const listTypes = ['current', 'completed', 'planTo', 'onHold', 'dropped']

//FirebaseWrapper.getInstance().addMedia('book', 'completed', { isbn: 123 })
