import * as firebase from 'firebase'

import 'firebase/firestore'

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
      const capMedia = mediaType[0].toUpperCase() + mediaType.slice(1)
      const pluralMedia = mediaType + 's'
      const capList = listType[0].toUpperCase() + listType.slice(1)
      const ref = item.isbn ? item.isbn : item.id
      await this._firestore
        .doc(`/${pluralMedia}/${ref}`)
        .get()
        .then(docSnapshot => {
          if (!docSnapshot.exists) {
            this._firestore
              .collection(`${pluralMedia}/`)
              .doc(ref)
              .set(item)
          }
        })

      await this._firestore
        .collection(`users${capMedia}Lists/${uid}/${listType}/`)
        .doc(ref)
        .set(item)
      await this._firestore
        .collection(`user${capList}/${uid}/${mediaType}/`)
        .doc(ref)
        .set(item)
    } catch (error) {
      console.error('problem adding media:', error)
    }
  }

  async getListsByStatus(listType) {
    try {
      const uid = this._firebaseInstance.auth().currentUser.uid
      console.log(uid)
      if (!listTypes.includes(listType)) throw 'not a valid list type'
      const colName = 'user' + listType[0].toUpperCase() + listType.slice(1)
      console.log(colName)
      const docRef = this._firestore.doc(`${colName}/${uid}`)
      const collections = await docRef.getCollections()
      console.log(collections)
      //return doc.exists ? doc.data() : 'no such document'
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
      console.log(colName)
      const docRef = this._firestore.collection(`${colName}`).doc(uid)
      docRef.get().then(function(doc) {
        if (doc.exists) {
          return doc.data()
        } else {
          return 'no such doc'
        }
      })
      //return doc.exists ? doc.data() : 'no such doc'
    } catch (error) {
      console.error('problem getting lists:', error)
    }
  }
}

const mediaTypes = ['book', 'movie', 'tvShow']
const listTypes = ['current', 'completed', 'planTo', 'onHold', 'dropped']

//FirebaseWrapper.getInstance().addMedia('book', 'completed', { isbn: 123 })
