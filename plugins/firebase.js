
import firebase from "firebase/compat"
import 'firebase/firestore' 
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCHu-Fjs2LAtUTla0Wky7R0fYlHWNU2VDA",
    authDomain: "7colordays.net",
    projectId: "sukusuku-6d5ed",
    storageBucket: "sukusuku-6d5ed.appspot.com",
    messagingSenderId: "10877504968",
    appId: "1:10877504968:web:a10250147987ac0172c4fd",
    measurementId: "G-3F3ZSVLM54"
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export default firebase