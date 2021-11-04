<template>
    <body>
        <v-app>
            <br><br><br>
            <div
            class="d-flex justify-center "
            >
                <sukusukuLogo />
            </div><br><br><br>
            <div
            class="d-flex justify-center"
            >
                <h2>スクスクはあなたの学生生活をより良いものにします。</h2>
            </div>
            
        </v-app>
    </body>
</template>



<script>
import firebase from "~/plugins/firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default {
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
        }
    },
    created(){
        /* setTimeout(()=>{
            //ログイン処理を実行
            this.login()
        },2*1000) */
    },
}

</script>