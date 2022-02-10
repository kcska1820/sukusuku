<template>
  <div>
    <v-col
      class="d-flex justify-center"
      cols="12"
    >
      <sukusukuLogo />
    </v-col>
    <v-col
      class="d-flex justify-center"
      cols="12"
    >
      <h1
        class="font-italic"
      >
        スクスクはあなたの学生生活をより良いものにします。
      </h1>
    </v-col>
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
    <v-card height="650">
      <v-form ref=login @submit.prevent>
        <v-card-title d-flex class="justify-center">
          ログイン
        </v-card-title>
        <v-divider></v-divider>
        <v-text-field
        solo
        filled
        clearable
        label="exsample@kcska.onmicrosoft.com"
        v-model="Mail"
        class="mx-2 mt-10">
        </v-text-field>
        <v-card-actions d-flex class="justify-center">
        <v-btn @click="login" width="450">
          ログイン
        </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    layout: 'Top',
    data(){
        return{
          url:'https://sukusukuserver.7colordays.net/sukusuku/',
          dialog:false,
          Mail:'',
          Password:'',
          show: false,
          rules: {
            required: value => !!value || '8文字以上入力してください',
            min: v => v.length >= 8 || '8文字以上入力してください',
            emailMatch: () => (`メールアドレスまたはパスワードが間違っています`),
          }
        }
    },
    methods:{
        login(){
          const result = this.Mail.indexOf('@kcska.onmicrosoft.com')
          if(result > 0){
            this.Set()
            this.dialog = false
          }else{
            this.Mail = ''
          }
        },
        Set(){
            this.url = this.url  + "?email=" + this.Mail
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
    },
    mounted(){
        setTimeout(()=>{
            //ログイン処理を実行
            this.dialog = true
        },2*1000)
    },
}

</script>