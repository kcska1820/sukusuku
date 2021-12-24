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
    layout: 'Top',
    data(){
        return{
            email:'',
            url:'http://localhost:8000/sukusuku/'
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
                this.Set()
            })
            .catch((error) => {
                console.log("error")
            })
        },
        Set(){
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
                // The user object has basic properties such as email
                this.url = this.url  + "?email=" + user.email
            }
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

                fetch('http://localhost:8000/sukusuku/cdselu/?userid=' + resJson[0].userid,{
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
                    localStorage.setItem('class',resJson[0].classid_id)
                })
                fetch('http://localhost:8000/sukusuku/gdsel/?userid=' + resJson[0].userid,{
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
                    localStorage.setItem('group',JSON.stringify(resJson))
                    this.$router.push("/student/Home")
                })
            })
            .catch(error => {       // ネットワークエラーの場合はここに到達する
                console.error(error);
            })
        }
    },
    mounted(){
        setTimeout(()=>{
            //ログイン処理を実行
            this.login()
        },2*1000)
    },
}

</script>