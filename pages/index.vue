<template>
    <body>
        <div>
            <v-col
            class="d-flex justify-center "
            cols="12"
            >
                <sukusukuLogo />
            </v-col>
            <v-col
            class="d-flex justify-center"
            cols="12"
            >
                <h1 class="font-italic">スクスクはあなたの学生生活をより良いものにします。</h1>
            </v-col>
        </div>
    </body>
</template>

<script>
import firebase from "~/plugins/firebase"
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
export default {
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
        }
    },
    created(){
        setTimeout(()=>{
            //ログイン処理を実行
            this.login()
        },2*1000)
    },
}

</script>