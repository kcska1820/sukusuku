<template>
    <v-btn :href=url>hoge</v-btn>
</template>

<script>
/* いらないです テスト用に保存中*/
import firebase from "~/plugins/firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default {
    data(){
        return{
            email:'',
            url:'http://localhost:8000/sukusuku/'
        }
    },
    methods:{
        login(){
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                console.log(user,token)
                this.$router.push("/student/calendars")
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })
        },
        GetAuth(){
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
                // The user object has basic properties such as email
                this.url = this.url  + "?email=" + user.email
            }
        },
    },
    created(){
        this.GetAuth()
    }
}
</script>

