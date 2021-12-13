<template>
  <div>
    <h1 class="mt-10"><v-icon size="1em">mdi-clock-plus-outline</v-icon>&emsp;メンバーを登録する</h1>
    <v-divider></v-divider>
    <br>
    <br>
  <v-file-input
    class="mt-12"
    v-model="file"
    accept=".xlsx"
    label="EXCEL File input"
    truncate-length="15"
    @change="onChange($event)"
  ></v-file-input>
  <br>
  <br>
  <br>
<v-col cols="12">
    <v-row
    justify="center"
    max-width="100"
    >
    <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="light-green darken-1"
          dark
          v-bind="attrs"
          v-on="on"
          x-large
          width="200"
        >
          登録する
        </v-btn>
      </template>
      <v-sheet
        class="text-center"
        height="150px"
      >

        <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >
          キャンセル
        </v-btn>
          <v-btn
          class="mt-6"
          text
          @click="upload"
        >
          登録
        </v-btn>
        <div class="my-3">
          メンバーを登録します。よろしいでしょうか？
        </div>
      </v-sheet>
    </v-bottom-sheet>
    </v-row>
    </v-col>
</div>
</template>
<script>
  import FormData from "form-data"
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      file: null,
      sheet:false,
      csrftoken:'',
    }
  },
  methods: {
    onChange(event){
      console.log(event);
      this.file = event;
    },
    async upload() {
      this.csrftoken = Cookies.get('csrftoken')
      
      fetch('http://localhost:8000/sukusuku/cdadd/',{
        method:"POST",
        headers: {
          'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'X-CSRFToken':this.csrftoken
        },
        body:this.file,
        mode:"cors",
        credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.json=obj)
        .catch(error => {
          return error.response;
        })
      },
    },
  }
</script>