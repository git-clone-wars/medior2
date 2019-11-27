// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.initializeUserInFiresstore= functions.auth.user().onCreate(async (user)=>{
  const email = user.email
  const uid = user.uid

  const doc = await admin.firestore().doc(`users/${uid}`)
  doc.set({email})
})
