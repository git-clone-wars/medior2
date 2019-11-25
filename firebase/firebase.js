import * as firebase from 'firebase'

import 'firebase/firestore'

export class FirebaseWrapper {
  constructor() {
    this.initialized = false
    this._firebaseInstance = null // instance of our npm package
    this._firebaseWrapperInstance = null // instance of our wrapper
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
}
