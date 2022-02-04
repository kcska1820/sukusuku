import firebase from "~/plugins/firebase"
import { onAuthStateChanged } from "firebase/compat/auth"

export default function ({ ssrContext, redirect }) {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      if (ssrContext) {
        return redirect('/')
      } else if (!localStorage.getItem('user')) {
        return redirect('/')
      }
    }
  })
}