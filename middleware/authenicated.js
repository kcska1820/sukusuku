import firebase from "~/plugins/firebase"
import {onAuthStateChanged } from "firebase/compat/auth"

export default function({redirect}){
    firebase.auth().onAuthStateChanged(user=>{
        if(!user){
            if(!localStorage.getItem('user')){
                return redirect('/')
            }
        }
    })
}