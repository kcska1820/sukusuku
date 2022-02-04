<template>
  <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="white"
          v-bind="attrs"
          v-on="on"
          size="2.5em"
          @click="login"
        >
          mdi-login
        </v-icon>
      </template>
      <span>ログイン</span>
    </v-tooltip>
</template>

<script>
import firebase from "~/plugins/firebase"
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth"
export default {
  data(){
    return{
      email:'',
      url:'https://sukusukuserver.7colordays.net/sukusuku/'
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

      fetch('https://sukusukuserver.7colordays.net/sukusuku/cdselu/?userid=' + resJson[0].userid,{
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
      fetch('https://sukusukuserver.7colordays.net/sukusuku/gdsel/?userid=' + resJson[0].userid,{
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
  }
}
</script>