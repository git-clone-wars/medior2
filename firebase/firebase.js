import * as firebase from 'firebase';

import 'firebase/firestore'

export default class FirebaseWrapper {
  constructor() {
    this.initialized = false;
    this._firebaseInstance = null; // instance of our npm package
    this._firebaseWrapperInstance = null; // instance of our wrapper
    this._firestore = null;
  }

  initialize(config) {
    if (!this.initialized) {
      // initialize firebase
      this._firebaseInstance = firebase.initializeApp(config);
      this._firestore = firebase.firestore();
      this.initialized = true;

      console.log("FIREBASE initialized, woohoo!");
    }
  }

  static getInstance() {
    // how we're going to refer to this class outside of our wrapper
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper();
    }
    return this._firebaseWrapperInstance;
  }

  signInEmailPassword(email, password) {
    try {
      console.log('1', this)
      console.log('2', this._firebaseWrapperInstance)
      console.log('3', this._firebaseWrapperInstance.auth())
      this._firebaseWrapperInstance.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      var errorCode = error.code
      var errorMessage = error.message
      console.log('Trouble signing in ?', errorCode, errorMessage)
    }

  }

  signOut() {
    try {
      this._firebaseWrapperInstance.auth().signOut()
    } catch (error) {
      console.log('Trouble signing out ?', error)
    }

  }

  createUserEmailPassword(email, password) {
    try {
      console.log('2', this._firebaseInstance)
      console.log('3', this._firebaseInstance.auth())
        this._firebaseInstance.auth().createUserWithEmailAndPassword(email, password)

    } catch (error) {
      var errorCode = error.code
      var errorMessage = error.message
      console.log('Trouble signing up ?', errorCode, errorMessage)
    }
  }


}
