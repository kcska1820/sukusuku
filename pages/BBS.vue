<template>
  <v-card color="accent">
    <v-card-title>
      <v-icon
        size="2em">
        mdi-message-text
      </v-icon>
      <h2>
        掲示板
      </h2>
      <v-dialog
        v-model="sinsei"
        max-width="500px"
        persistent
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            fab
            absolute
            right
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-form
          ref="BBSaddform"
          v-model="valid"
          lazy-validation
          @submit.prevent
          >
        <v-card>
          <v-card-title>
            <span class="text-h5">スレッドの追加申請</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="editedItem.title"
                  label="スレッドタイトル"
                  :rules="[rules.required]"
                  required/>
              </v-row><v-row>
                <v-textarea
                  v-model="editedItem.note"
                  label="備考"
                  outlined/>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="red darken-2"
              text
              @click="sclose">
              キャンセル
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="blue darken-1"
              text
              @click="save">
              申請
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
    </v-card-title>
    <v-row class="d-flex justify-end">
      <v-col cols="12" sm="5" class="px-6">
        <v-toolbar floating>
          <v-row>
            <!--検索欄-->
            <v-col cols="12" class="pr-7">
              <v-text-field
                v-model="searchtxt"
                @keyup.enter="search"
                clearable
                append-icon="mdi-magnify">
              </v-text-field>
            </v-col>
          </v-row>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-divider/>
    <br>
    <!--itemsをthdataにする-->
    <div
      v-for="item in thdata"
      :key="item.id"
      router
      exact>
      <template v-if="item.flag == '1'">
        <v-col>
          <BBSCard
            :item="item"
            :user="userid"
            @reflesh="reflesh"/>
        </v-col>
      </template>
      <!--凍結済みかつユーザが板立て人-->
      <template v-else-if="item.flag == '2' && item.master_id == userid">
        <v-col>
          <BBSCard
            :item="item"
            :user="userid"
            @reflesh="reflesh"/>
        </v-col>
      </template>
      <!--非表示かつユーザのロールが教師-->
      <template v-else-if="item.flag == '3' && role == 'teacher'">
        <v-col>
          <BBSCard
            :item="item"
            :user="userid"
            @reflesh="reflesh"/>
        </v-col>
      </template>
    </div>
  </v-card>
</template>
<script>
//import items from '/components/threadList.json'
import BBSCard from '/components/BBSCard'
import searchsup from '/components/searchSup'
export default {
  data:() => ({
    rules: {
        required: value => !!value || 'こちらは必須項目です',
      },
    url:'https://sukusukuserver.7colordays.net/sukusuku/',
    addurl:'',
    srcurl:'',
    valid:true,
    sinsei:false,
    touketu:false,
    kaijo:false,
    searchtxt:'',
    kw:'',
    user:[],
    userid:'',
    role:'',
    //items:items,
    thdata:[],
    editedIndex: -1,
    editedItem:{
      title:'',
      note:'',
    },
    defaultItem:{
      title:'',
      note:'',
    },
  }),

  components: {
      BBSCard
  },

  watch: {
    sinsei (val) {
      val || this.sclose()
    },
    touketu (val) {
      val || this.tclose()
    },
    kaijo (val) {
      val || this.kclose()
    },
  },
  
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userid = this.user[0].userid
    this.role = this.user[0].roleid_id
  },

  created () {
    fetch(this.url + 'thsel/',{
      method:"GET",
      mode:"cors",
      credentials: 'include'
    }).then((res)=>res.json())
    .then(obj=>this.thdata=obj)
  },

  methods: {
    /*
      ログイン中ユーザ取得
      this.user = JSON.parse(localStorage.getItem('user'))
      this.userid = this.user[0].userid
    */
    search (){
      this.kw = searchsup(this.searchtxt, 'title')
      this.srcurl = this.url + 'thsrc' + this.kw.sql
      fetch(this.srcurl ,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      }).then((res)=>res.json())
      .then(obj=>this.thdata=obj)
    },

    save () {
      if(this.$refs.BBSaddform.validate()){
      this.addurl = this.url + 'thadd/?title=' + this.editedItem.title + '&flag=0' + '&note=' + this.editedItem.note + '&master=' + this.userid
      fetch(this.addurl,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>this.thdata=obj)
      this.sclose()
      }
    },

    sclose (){
      this.sinsei = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    tclose (){
      this.touketu = false
      this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      })
    },

    kclose (){
      this.kaijo = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    reflesh () {
      fetch(this.url + 'thsel/',{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      }).then((res)=>res.json())
      .then(obj=>this.thdata=obj)
    },
  },
  middleware:"authenicated"
}
</script>