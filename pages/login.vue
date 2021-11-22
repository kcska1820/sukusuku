<template>
<div>
    <v-btn @click="hoge">hoge</v-btn>
    <v-btn @click="GetAuth">gethuga</v-btn>
</div>
</template>

<script>
/* いらないです テスト用に保存中*/
import firebase from "~/plugins/firebase"
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, OAuthProvider } from "firebase/auth";

export default {
    data(){
        return{
            email:'',
            url:'http://localhost:8000/sukusuku/',
            temp:[],
        }
    },
    methods:{
        login(){
            const provider = new OAuthProvider('microsoft.com');
            const auth = getAuth();
            provider.setCustomParameters({
                    // Optional "tenant" parameter in case you are using an Azure AD tenant.
                    // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
                    // or "common" for tenant-independent tokens.
                    // The default value is "common".
                    tenant: 'kcska.onmicrosoft.com'
                });
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = OAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const idToken = credential.idToken;
                console.log(credential,accessToken,idToken)
                this.$router.push("/student/Home")
            }).catch((error) => {
               console.log("error")
            })
        },
        /* login2(){
            const provider = new OAuthProvider('microsoft.com');
            const auth = getAuth();
            signInWithRedirect(auth, provider);
            getRedirectResult(auth)
            .then((result) => {
                // User is signed in.
                // IdP data available in result.additionalUserInfo.profile.

                // Get the OAuth access token and ID Token
                const credential = OAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const idToken = credential.idToken;
                this.$router.push("/student/Home")
            })
            .catch((error) => {
                // Handle error.
                console.log(error)
            });

        }, */
        GetAuth(){
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
                // The user object has basic properties such as email
                this.url = this.url  + "?email=" + user.email
            }
            localStorage.setItem('url',this.url)
            console.log("aaa")
        },
        hoge(){
            fetch(this.url,{
                method:"GET",
                mode:"cors",
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }       // 404 や 500 ステータスならここに到達する
                throw new Error('Network response was not ok.');
            })
            .then(resJson => {
                localStorage.setItem('user',JSON.stringify(resJson))
                this.temp = JSON.parse(localStorage.getItem('user'))
                console.log(this.temp)

            })
            .catch(error => {       // ネットワークエラーの場合はここに到達する
                console.error(error);
            })
        },
        huga(){
            this.temp = JSON.parse(localStorage.getItem('user'))
            const aaa = this.temp[0].rollid_id
            if(aaa == 'student'){
                console.log(aaa)
            }else{
                console.log("error")
            }
        }
    },
    created(){
        /* this.login2() */
    },
/*  middleware:"authenicated" */
}
</script>

