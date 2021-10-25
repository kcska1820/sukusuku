import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "ここにAPIキーが入ります",
    authDomain: "nuxt-js-firebase-studies.firebaseapp.com",
    databaseURL: "https://nuxt-js-firebase-studies.firebaseio.com",
    projectId: "nuxt-js-firebase-studies",
    storageBucket: "nuxt-js-firebase-studies.appspot.com",
    messagingSenderId: "296913232266"
  })
}

export default firebase